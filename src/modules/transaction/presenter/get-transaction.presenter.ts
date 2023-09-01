import { ApiProperty } from '@nestjs/swagger';

class medicalDetail {
  patientName: string;
  doctor: {
    name: string;
    specialization: string;
  };
  pharmacist: {
    name: string;
  };
  doctorActions: [
    {
      name: string;
      price: number;
    },
  ];
  medicines: [
    {
      name: string;
      quantity: number;
      price: number;
    },
  ];
}

export class GetTransactionPresenter {
  @ApiProperty({
    description: 'Transaction Id',
    example: '1',
  })
  id: number;

  @ApiProperty({
    description: 'Admin that responsible on the transaction',
    example: {
      id: 1,
      name: 'Shaun Wyman',
    },
  })
  admin: {
    id: number;
    name: string;
  } | null;

  @ApiProperty({
    description: 'Recipient name',
    example: 'Asep',
  })
  recipientName: string;

  @ApiProperty({
    description: 'Transaction payment method',
    example: 'INSURANCE',
  })
  paymentMethod: string;

  @ApiProperty({
    description: 'Transaction payment status',
    example: 'PENDING',
  })
  paymentStatus: string;

  @ApiProperty({
    description: 'Amount of money that need to be paid by the recipient',
    example: 10102,
  })
  paymentBill: number;

  @ApiProperty({
    description: 'Transaction created datetime',
    example: '2023-09-01T09:21:04.356Z',
  })
  issueAt: Date;

  @ApiProperty({
    description: 'Patient medical record detail',
    example: {
      patientName: 'Sumarto',
      doctor: {
        name: 'Mrs. Felicia Reinger',
        specialization: 'Dokter Poli Umum',
      },
      pharmacist: {
        name: 'Georgia Gibson',
      },
      doctorActions: [
        {
          name: 'Bedah Ringan',
          price: 2866,
        },
      ],
      medicines: [
        {
          name: 'Rustic Bronze Keyboard',
          quantity: 2,
          price: 3618,
        },
      ],
    },
  })
  medicalDetail: medicalDetail;
}
