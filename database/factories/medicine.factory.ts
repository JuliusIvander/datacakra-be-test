import { Medicine } from "../../src/modules/medical-record/entities/medicine.entity";
import { setSeederFactory } from "typeorm-extension";
import { Faker } from "@faker-js/faker";

export const MedicineFactory = setSeederFactory(Medicine, (faker: Faker): Medicine => {
    const medicine = new Medicine();
    medicine.name = faker.commerce.productName();
    medicine.sku = faker.phone.imei();
    medicine.price = faker.number.int({ min: 500, max: 5000 });
    medicine.stock = faker.number.int({ min: 0, max: 20 });

    return medicine;
})