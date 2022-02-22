import {makeAutoObservable} from 'mobx'

export default class heroStore{
    constructor() {
        this._heroesState = [];
        makeAutoObservable(this)
    }

    setHero = (hero) => {
        const newHero = {...JSON.parse(hero), showLabel: 1}
        const e = this._heroesState.find((el) => el.hero === newHero.hero) 
        if(e){
            const idx = this._heroesState.indexOf(e)
            if(idx) this._heroesState[idx] = newHero
        } 
        else this._heroesState.push(newHero)
    }

    setOneHero = (hero) => {
        const idx = this._heroesState.indexOf(hero)
        if(idx) this._heroesState[idx] = hero
    }

    get allHeroes() {
        return this._heroesState
    }
    
}