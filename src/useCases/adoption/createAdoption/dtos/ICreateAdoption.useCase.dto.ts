export interface ICreateAdoptionUseCaseDto {
  readonly petId: string;

  readonly guardianId: string;

  notes?: string;

  adoptionDate: Date;
}
