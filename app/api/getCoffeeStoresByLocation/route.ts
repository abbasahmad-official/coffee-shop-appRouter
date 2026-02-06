import { NextResponse, NextRequest} from 'next/server';
import { fetchCoffeeStores } from '@/lib/coffee-stores';

  // export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
try{
     const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat') || '';
    const long = searchParams.get('long') || '';
    const limitParam = searchParams.get('limit') || '';
    const limit = limitParam ? parseInt(limitParam) : 6;

    if(lat && long){
        const coffeeStores = await fetchCoffeeStores({lati:parseFloat(lat) , long:parseFloat(long)}, limit);
        return NextResponse.json(coffeeStores)
    }

} catch (error) {
  console.error("Error fetching coffee stores:", error);
}
 
}