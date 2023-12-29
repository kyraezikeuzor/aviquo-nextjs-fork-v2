import { head } from '@vercel/blob';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  if (filename ) {
    const blob = await head(filename);

    // console.log(NextResponse.json(blob))
    return NextResponse.json(blob);
  }
//   console.log(NextResponse.json({status : 'fail'}))
  return NextResponse.json({status : 'fail'});
}