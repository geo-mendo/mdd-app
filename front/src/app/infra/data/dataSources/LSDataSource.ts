import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LSDataSource {
    public setItem(key: string, item: string) {
        localStorage.setItem(key,item)
    }

    public getItem(key:string): string{
        const item = localStorage.getItem(key)
        if(!item){
            throw new Error(`the element with the key: ${key},doesn't exist in this storage !`)
        }
        return item;
    }
}