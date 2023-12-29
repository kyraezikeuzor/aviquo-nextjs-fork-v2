import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (filename && request.body) {
    const blob = await put(filename, request.body, {
        access: 'public',
    });

    // console.log(NextResponse.json(blob))
    return NextResponse.json(blob);
  }
//   console.log(NextResponse.json({status : 'fail'}))
  return NextResponse.json({status : 'fail'});
}