import { NextRequest, NextResponse } from 'next/server';
import { VaccineModel } from '@/lib/models/vaccine';

// Cập nhật số lượng tồn kho
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: 'ID vắc xin không hợp lệ'
      }, { status: 400 });
    }

    const body = await request.json();
    const { quantity } = body;

    if (typeof quantity !== 'number' || quantity < 0) {
      return NextResponse.json({
        success: false,
        message: 'Số lượng phải là số không âm'
      }, { status: 400 });
    }

    const vaccine = await VaccineModel.updateStock(id, quantity);
    
    if (!vaccine) {
      return NextResponse.json({
        success: false,
        message: 'Không tìm thấy vắc xin'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: vaccine,
      message: 'Cập nhật tồn kho thành công'
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi cập nhật tồn kho'
    }, { status: 500 });
  }
}

// Giảm tồn kho (dùng khi có người đặt lịch)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        message: 'ID vắc xin không hợp lệ'
      }, { status: 400 });
    }

    const body = await request.json();
    const { amount = 1 } = body;

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Số lượng phải là số dương'
      }, { status: 400 });
    }

    const vaccine = await VaccineModel.decreaseStock(id, amount);
    
    if (!vaccine) {
      return NextResponse.json({
        success: false,
        message: 'Không tìm thấy vắc xin hoặc không đủ tồn kho'
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      data: vaccine,
      message: 'Giảm tồn kho thành công'
    });
  } catch (error) {
    console.error('Error decreasing stock:', error);
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi giảm tồn kho'
    }, { status: 500 });
  }
}