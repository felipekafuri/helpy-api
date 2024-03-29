import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddVerifiedEmailColumn1599250515929
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'contractors',
      new TableColumn({
        name: 'verified_email',
        type: 'boolean',
        default: false,
      })
    );

    await queryRunner.addColumn(
      'providers',
      new TableColumn({
        name: 'verified_email',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('contractors', 'verified_email');
    await queryRunner.dropColumn('providers', 'verified_email');
  }
}
