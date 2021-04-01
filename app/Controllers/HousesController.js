import { ProxyState } from "../AppState.js";
import { housesService } from "../Services/HouseService.js";


//Private
function _draw() {
    // What are we drawing
    let houses = ProxyState.houses
    let template = ''
    // if a collection iterate over collection to generate template for each object
    houses.forEach(house => {
        template += house.Template
    })
    // render to page
    document.getElementById('houses').innerHTML = template
}

//Public
export default class HousesController {
    constructor() {
        // OH oh more magic. you still know.....
        // 1st argument is name of the property in the AppState to 'watch' for changes
        // 2nd argument: name of the function to run when 1st argument property changes
        ProxyState.on('houses', _draw);

        // manually run draw the on page load
        _draw()
    }


    createHouse() {
        // if this method is triggered by an event (submit event) prevent the default action of reloading the page
        window.event.preventDefault()
        // grab the element from html that triggered this event
        const form = window.event.target
        let newHouse = {
            // @ts-ignore
            beds: Number(form.beds.value),
            // @ts-ignore
            baths: Number(form.baths.value),
            // @ts-ignore
            sqft: form.sqft.value,
            // @ts-ignore  this converts the string to a number
            price: Number(form.price.value),
            // @ts-ignore
            address: form.address.value,
            // @ts-ignore
            imgUrl: form.imgUrl.value
        }
        housesService.createHouse(newHouse)

        // @ts-ignore
        form.reset()

        // get the modal and close (using jQuery's "$" selector) 
        $('#new-house-form').modal('hide')
    }

    deleteHouse(id) {
        console.log('hey');
        housesService.deleteHouse(id)
    }

    bid(id) {
        housesService.bid(id)
    }

}
