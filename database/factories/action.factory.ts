import { Faker } from "@faker-js/faker";
import { Action } from "../../src/modules/medical-record/entities/action.entity";
import { setSeederFactory } from "typeorm-extension";

export const ActionFactory =  setSeederFactory(Action, (faker: Faker): Action => {
    const action = new Action();
    action.price = faker.number.int({ min: 500, max: 5000 });

    return action;
});