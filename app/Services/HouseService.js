import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";

class HousesService {
    createHouse(newHouse) {
        let house = new House(newHouse.beds, newHouse.baths, newHouse.sqft, newHouse.address, newHouse.price, newHouse.imgUrl)
        console.log(house);
        ProxyState.houses = [...ProxyState.houses, house]
    }
    bid(id) {
        // find the Car
        let house = ProxyState.houses.find(house => house.id === id)
        // make the change
        house.price += 1000

        // trigger the cycle (this can only be the top level properties of ProxyState) to update the page
        ProxyState.houses = ProxyState.houses
    }
    deleteHouse(id) {
        // remove the car with that id from the array
        // trigger the update cycle by setting the value of ProxyState.cars

        // NOTE filter iterates over an array and only keeps things where the statement provided is true
        // here we remove the car with the id by only keeping cars that do not have that id
        // then we set the ProxyState array back to the result after the filter
        ProxyState.houses = ProxyState.houses.filter(house => house.id != id)
    }

}

export const housesService = new HousesService();