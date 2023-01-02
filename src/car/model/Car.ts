import {Group} from "../../types";

export class Car {
    private readonly groups: Object;

    constructor(
        private readonly id: number,
        private readonly seats: number
    ) {
        this.groups = {};
    }

    getId() {
        return this.id;
    }

    addGroup(group: Group) {
        this.groups[group.id] = group;
    }

    dropGroup(groupId) {
        delete this.groups[groupId];
    }

    getFreeSeats() {
        return this.seats - Object.values(this.groups).reduce((prev: number, curr: Group) => prev + curr.people, 0);
    }

    toString() {
        return JSON.stringify(
            {
                "id": this.id,
                "seats": this.seats
            }
        );
    }
}
