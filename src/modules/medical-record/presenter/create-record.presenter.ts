import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordPresenter {
  @ApiProperty({
    description: 'Record id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Patient name',
    example: 'Sumarto',
  })
  patientName: string;

  @ApiProperty({
    description: 'Name that handle the medical record',
    example: 'Mrs. Felicia Reinger',
  })
  doctorName: string;

  @ApiProperty({
    description: 'Doctor notes that will be read by pharmacist',
    example: 'Obat penyembuh luka yang bagus yak',
  })
  doctorNotes: string;

  @ApiProperty({
    description: 'Doctor action on handling the patient',
    example: [
      {
        id: 1,
        name: 'Konsultasi Umum',
        price: 1910,
      },
    ],
  })
  actions: [
    {
      id: number;
      name: string;
      price: number;
    },
  ];

  @ApiProperty({
    description: 'Medical record created datetime',
    example: '2023-09-01T09:18:34.472Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Medical record updated datetime',
    example: '2023-09-01T09:18:34.472Z',
  })
  updatedAt: Date;
}
