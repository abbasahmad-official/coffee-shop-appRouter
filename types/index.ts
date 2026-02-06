export type overpassType = {
    id: number;
    tags:{
        name: string;
         "addr:housenumber"?: string;
         "addr:street"?: string;
         "addr:city"?: string;
    }
}

export type coffeeStoresType = {
    id: number;
     name: string;
    address: string;
    city: string;
    imgUrl: string;
    imgId?: string;
    voting?: number;
}

export type positionType = {
    coords:{
        latitude: number;
        longitude: number;
    }
}
export type locationType = {
    lati: number;
    long: number;
}

export type airTableRecordType = {
    id: string;
    recordId: string;
    fields: coffeeStoresType;
}

 export type State = {
    id: string;
    voting?: number;
  }  
