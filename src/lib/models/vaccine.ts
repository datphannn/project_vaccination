import { supabase } from '../db';

export interface Vaccine {
  vaccine_id: number;
  name: string | null;
  manufacturer: string | null;
  description: string | null;
  dosage: string | null;
  number_of_doses: number | null;
  expiry_date: Date | null;
  stock_quantity: number | null;
  gender: string | null; // Assuming this is a bit/boolean represented as string
  age_range: string | null;
}

export class VaccineModel {
  static async findAll(): Promise<Vaccine[]> {
    const { data, error } = await supabase
      .from('vaccines')
      .select('*')
      .order('vaccine_id', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }

  static async findById(vaccine_id: number): Promise<Vaccine | null> {
    const { data, error } = await supabase
      .from('vaccines')
      .select('*')
      .eq('vaccine_id', vaccine_id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data;
  }

  static async create(vaccine: Omit<Vaccine, 'vaccine_id'>): Promise<Vaccine> {
    const { data, error } = await supabase
      .from('vaccines')
      .insert([{
        name: vaccine.name,
        manufacturer: vaccine.manufacturer,
        description: vaccine.description,
        dosage: vaccine.dosage,
        number_of_doses: vaccine.number_of_doses,
        expiry_date: vaccine.expiry_date?.toISOString(),
        stock_quantity: vaccine.stock_quantity,
        gender: vaccine.gender,
        age_range: vaccine.age_range
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async update(vaccine_id: number, updates: Partial<Vaccine>): Promise<Vaccine | null> {
    const updateData: any = {};
    
    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.manufacturer !== undefined) updateData.manufacturer = updates.manufacturer;
    if (updates.description !== undefined) updateData.description = updates.description;
    if (updates.dosage !== undefined) updateData.dosage = updates.dosage;
    if (updates.number_of_doses !== undefined) updateData.number_of_doses = updates.number_of_doses;
    if (updates.expiry_date !== undefined) updateData.expiry_date = updates.expiry_date?.toISOString();
    if (updates.stock_quantity !== undefined) updateData.stock_quantity = updates.stock_quantity;
    if (updates.gender !== undefined) updateData.gender = updates.gender;
    if (updates.age_range !== undefined) updateData.age_range = updates.age_range;
    
    if (Object.keys(updateData).length === 0) return null;

    const { data, error } = await supabase
      .from('vaccines')
      .update(updateData)
      .eq('vaccine_id', vaccine_id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async delete(vaccine_id: number): Promise<boolean> {
    const { error } = await supabase
      .from('vaccines')
      .delete()
      .eq('vaccine_id', vaccine_id);
    
    if (error) throw error;
    return true;
  }

  static async updateStock(vaccine_id: number, quantity: number): Promise<Vaccine | null> {
    const { data, error } = await supabase
      .from('vaccines')
      .update({ 
        stock_quantity: quantity
      })
      .eq('vaccine_id', vaccine_id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }

  static async decreaseStock(vaccine_id: number, amount: number = 1): Promise<Vaccine | null> {
    const vaccine = await this.findById(vaccine_id);
    if (!vaccine || vaccine.stock_quantity === null || vaccine.stock_quantity < amount) {
      return null;
    }

    return await this.updateStock(vaccine_id, vaccine.stock_quantity - amount);
  }

  // Additional method to find by name
  static async findByName(name: string): Promise<Vaccine | null> {
    const { data, error } = await supabase
      .from('vaccines')
      .select('*')
      .ilike('name', name)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  }
}