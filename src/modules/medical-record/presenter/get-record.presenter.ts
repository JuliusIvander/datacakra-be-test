import { ApiProperty } from '@nestjs/swagger';

export class GetRecordPresenter {
  @ApiProperty({
    description: 'Medical record Id',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Patient name',
    example: 'Sumarto',
  })
  patientName: string;

  @ApiProperty({
    description: 'Doctor that handle the medical record',
    example: {
      id: 3,
      name: 'Mrs. Felicia Reinger',
      specialization: 'Dokter Poli Umum',
    },
  })
  doctor: {
    id: number;
    name: string;
    specialization: string;
  };

  @ApiProperty({
    description: 'Doctor notes that will be read by pharmacist',
    example: 'Obat penyembuh luka yang bagus yak',
  })
  doctorNotes: string;

  @ApiProperty({
    description: 'User that manipulate medicine data in designated record',
    example: {
      id: 2,
      name: 'Georgia Gibson',
    },
  })
  pharmacist: {
    id: number;
    name: string;
  };

  @ApiProperty({
    description: 'Doctor action on handling the patient',
    example: [
      {
        id: 2,
        name: 'Bedah Ringan',
        price: 2866,
      },
    ],
  })
  actions: [
    {
      name: string;
      price: number;
    },
  ];

  @ApiProperty({
    description: 'Medicine that inputed by pharmacist',
    example: [
      {
        id: 1,
        name: 'Rustic Bronze Keyboard',
        quantity: 2,
        price: 3618,
      },
    ],
  })
  medicines: [
    {
      name: string;
      quantity: number;
      price: number;
    },
  ];
}
