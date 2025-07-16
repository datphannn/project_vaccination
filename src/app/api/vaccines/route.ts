import { NextRequest, NextResponse } from 'next/server';
import { VaccineModel } from '@/models/vaccine'; 

// GET - Lấy danh sách vaccines
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Xây dựng conditions từ query parameters
    const conditions: any = {};
    
    const name = searchParams.get('name');
    if (name) {
      conditions.name = { contains: name };
    }
    
    const ageRange = searchParams.get('age_range');
    if (ageRange) {
      conditions.age_range = { contains: ageRange };
    }
    
    const manufacturer = searchParams.get('manufacturer');
    if (manufacturer) {
      conditions.manufacturer = { contains: manufacturer };
    }
    
    const minStock = searchParams.get('min_stock');
    if (minStock) {
      conditions.stock_quantity = { gt: parseInt(minStock) };
    }
    
    const gender = searchParams.get('gender');
    if (gender) {
      conditions.gender = gender;
    }
    
    const vaccines = await VaccineModel.findAll(conditions);
    
    return NextResponse.json({
      success: true,
      data: vaccines,
      count: vaccines.length
    });
  } catch (error) {
    console.error('GET /api/vaccines error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Lỗi khi lấy danh sách vaccines',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Tạo vaccine mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Tên vaccine là bắt buộc' 
        },
        { status: 400 }
      );
    }
    
    // Kiểm tra vaccine đã tồn tại chưa
    const existingVaccine = await VaccineModel.findByName(body.name);
    if (existingVaccine) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Vaccine với tên này đã tồn tại' 
        },
        { status: 409 }
      );
    }
    
    const vaccineData = {
      name: body.name,
      manufacturer: body.manufacturer || null,
      description: body.description || null,
      dosage: body.dosage || null,
      number_of_doses: body.number_of_doses || null,
      expiry_date: body.expiry_date ? new Date(body.expiry_date) : null,
      stock_quantity: body.stock_quantity || 0,
      gender: body.gender || null,
      age_range: body.age_range || null
    };
    
    const vaccine = await VaccineModel.create(vaccineData);
    
    return NextResponse.json({
      success: true,
      message: 'Vaccine đã được tạo thành công',
      data: vaccine
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/vaccines error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Lỗi khi tạo vaccine',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Cập nhật vaccine
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { vaccine_id, ...updateData } = body;
    
    if (!vaccine_id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'vaccine_id là bắt buộc' 
        },
        { status: 400 }
      );
    }
    
    // Kiểm tra vaccine có tồn tại không
    const existingVaccine = await VaccineModel.findById(vaccine_id);
    if (!existingVaccine) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Vaccine không tồn tại' 
        },
        { status: 404 }
      );
    }
    
    // Chuẩn bị dữ liệu cập nhật
    const vaccineUpdateData: any = {};
    
    if (updateData.name !== undefined) vaccineUpdateData.name = updateData.name;
    if (updateData.manufacturer !== undefined) vaccineUpdateData.manufacturer = updateData.manufacturer;
    if (updateData.description !== undefined) vaccineUpdateData.description = updateData.description;
    if (updateData.dosage !== undefined) vaccineUpdateData.dosage = updateData.dosage;
    if (updateData.number_of_doses !== undefined) vaccineUpdateData.number_of_doses = updateData.number_of_doses;
    if (updateData.expiry_date !== undefined) vaccineUpdateData.expiry_date = updateData.expiry_date ? new Date(updateData.expiry_date) : null;
    if (updateData.stock_quantity !== undefined) vaccineUpdateData.stock_quantity = updateData.stock_quantity;
    if (updateData.gender !== undefined) vaccineUpdateData.gender = updateData.gender;
    if (updateData.age_range !== undefined) vaccineUpdateData.age_range = updateData.age_range;
    
    const vaccine = await VaccineModel.update(vaccine_id, vaccineUpdateData);
    
    return NextResponse.json({
      success: true,
      message: 'Vaccine đã được cập nhật thành công',
      data: vaccine
    });
  } catch (error) {
    console.error('PUT /api/vaccines error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Lỗi khi cập nhật vaccine',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Xóa vaccine
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const vaccine_id = searchParams.get('vaccine_id');
    
    if (!vaccine_id) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'vaccine_id là bắt buộc' 
        },
        { status: 400 }
      );
    }
    
    // Kiểm tra vaccine có tồn tại không
    const existingVaccine = await VaccineModel.findById(parseInt(vaccine_id));
    if (!existingVaccine) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Vaccine không tồn tại' 
        },
        { status: 404 }
      );
    }
    
    await VaccineModel.delete(parseInt(vaccine_id));
    
    return NextResponse.json({
      success: true,
      message: 'Vaccine đã được xóa thành công'
    });
  } catch (error) {
    console.error('DELETE /api/vaccines error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Lỗi khi xóa vaccine',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}