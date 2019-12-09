import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 150 })
    firstName: string;

    @Column("varchar", { length: 150 })
    lastName: string;

    @Column()
    age: number;

    @Column("varchar", { length: 50, nullable: true })
    nickname?: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    beforeInsert() {
        if (!this.nickname || this.nickname.length === 0) this.nickname = "default";
    }
}
