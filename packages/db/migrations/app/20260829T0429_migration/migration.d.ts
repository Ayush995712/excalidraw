#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/777d104d4c639e37e53ccad0df092bfc5ebbd0217a3ea0ce992cd94040c52e5f/contract';
import { Migration } from '@prisma/orm-postgres/migration';
export default class M extends Migration<never, End> {
    readonly endContractJson: {
        _generated: {
            message: string;
            regenerate: string;
            warning: string;
        };
        capabilities: {
            postgres: {
                distinctOn: boolean;
                jsonAgg: boolean;
                lateral: boolean;
                limit: boolean;
                orderBy: boolean;
                returning: boolean;
            };
            sql: {
                checkConstraint: boolean;
                defaultInInsert: boolean;
                enums: boolean;
                lateral: boolean;
                returning: boolean;
                scalarList: boolean;
            };
        };
        domain: {
            namespaces: {
                public: {
                    models: {
                        Chat: {
                            fields: {
                                id: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                message: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                roomId: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                userId: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                            };
                            relations: {
                                room: {
                                    cardinality: string;
                                    on: {
                                        localFields: string[];
                                        targetFields: string[];
                                    };
                                    to: {
                                        model: string;
                                        namespace: string;
                                    };
                                };
                                user: {
                                    cardinality: string;
                                    on: {
                                        localFields: string[];
                                        targetFields: string[];
                                    };
                                    to: {
                                        model: string;
                                        namespace: string;
                                    };
                                };
                            };
                            storage: {
                                fields: {
                                    id: {
                                        column: string;
                                    };
                                    message: {
                                        column: string;
                                    };
                                    roomId: {
                                        column: string;
                                    };
                                    userId: {
                                        column: string;
                                    };
                                };
                                namespaceId: string;
                                table: string;
                            };
                        };
                        Room: {
                            fields: {
                                adminId: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                createdAt: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                id: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                slug: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                            };
                            relations: {
                                admin: {
                                    cardinality: string;
                                    on: {
                                        localFields: string[];
                                        targetFields: string[];
                                    };
                                    to: {
                                        model: string;
                                        namespace: string;
                                    };
                                };
                                chats: {
                                    cardinality: string;
                                    on: {
                                        localFields: string[];
                                        targetFields: string[];
                                    };
                                    to: {
                                        model: string;
                                        namespace: string;
                                    };
                                };
                            };
                            storage: {
                                fields: {
                                    adminId: {
                                        column: string;
                                    };
                                    createdAt: {
                                        column: string;
                                    };
                                    id: {
                                        column: string;
                                    };
                                    slug: {
                                        column: string;
                                    };
                                };
                                namespaceId: string;
                                table: string;
                            };
                        };
                        User: {
                            fields: {
                                email: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                id: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                name: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                password: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                                photo: {
                                    nullable: boolean;
                                    type: {
                                        codecId: string;
                                        kind: string;
                                    };
                                };
                            };
                            relations: {
                                chats: {
                                    cardinality: string;
                                    on: {
                                        localFields: string[];
                                        targetFields: string[];
                                    };
                                    to: {
                                        model: string;
                                        namespace: string;
                                    };
                                };
                                rooms: {
                                    cardinality: string;
                                    on: {
                                        localFields: string[];
                                        targetFields: string[];
                                    };
                                    to: {
                                        model: string;
                                        namespace: string;
                                    };
                                };
                            };
                            storage: {
                                fields: {
                                    email: {
                                        column: string;
                                    };
                                    id: {
                                        column: string;
                                    };
                                    name: {
                                        column: string;
                                    };
                                    password: {
                                        column: string;
                                    };
                                    photo: {
                                        column: string;
                                    };
                                };
                                namespaceId: string;
                                table: string;
                            };
                        };
                    };
                };
            };
        };
        execution: {
            executionHash: string;
            mutations: {
                defaults: {
                    onCreate: {
                        id: string;
                        kind: string;
                    };
                    ref: {
                        column: string;
                        namespace: string;
                        table: string;
                    };
                }[];
            };
        };
        extensions: {};
        meta: {};
        profileHash: string;
        roots: {
            chat: {
                model: string;
                namespace: string;
            };
            room: {
                model: string;
                namespace: string;
            };
            user: {
                model: string;
                namespace: string;
            };
        };
        schemaVersion: string;
        storage: {
            namespaces: {
                public: {
                    entries: {
                        table: {
                            chat: {
                                columns: {
                                    id: {
                                        codecId: string;
                                        default: {
                                            expression: string;
                                            kind: string;
                                        };
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    message: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    roomId: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    userId: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                };
                                foreignKeys: {
                                    source: {
                                        columns: string[];
                                        namespaceId: string;
                                        tableName: string;
                                    };
                                    target: {
                                        columns: string[];
                                        namespaceId: string;
                                        tableName: string;
                                    };
                                }[];
                                indexes: {
                                    columns: string[];
                                    name: string;
                                    prefix: string;
                                    unique: boolean;
                                }[];
                                primaryKey: {
                                    columns: string[];
                                };
                                uniques: never[];
                            };
                            room: {
                                columns: {
                                    adminId: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    createdAt: {
                                        codecId: string;
                                        default: {
                                            expression: string;
                                            kind: string;
                                        };
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    id: {
                                        codecId: string;
                                        default: {
                                            expression: string;
                                            kind: string;
                                        };
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    slug: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                };
                                foreignKeys: {
                                    source: {
                                        columns: string[];
                                        namespaceId: string;
                                        tableName: string;
                                    };
                                    target: {
                                        columns: string[];
                                        namespaceId: string;
                                        tableName: string;
                                    };
                                }[];
                                indexes: {
                                    columns: string[];
                                    name: string;
                                    prefix: string;
                                    unique: boolean;
                                }[];
                                primaryKey: {
                                    columns: string[];
                                };
                                uniques: {
                                    columns: string[];
                                }[];
                            };
                            user: {
                                columns: {
                                    email: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    id: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    name: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    password: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                    photo: {
                                        codecId: string;
                                        nativeType: string;
                                        nullable: boolean;
                                    };
                                };
                                foreignKeys: never[];
                                indexes: never[];
                                primaryKey: {
                                    columns: string[];
                                };
                                uniques: {
                                    columns: string[];
                                }[];
                            };
                        };
                    };
                    id: string;
                    kind: string;
                };
            };
            storageHash: string;
        };
        target: string;
        targetFamily: string;
    };
    get operations(): Promise<import(".pnpm/@prisma+orm-family-sql@8.0.0-rc.8_@prisma+cli-engine@0.2.3_magicast@0.5.4__magicast@0.5.4_typ_ft2t2zhj4x5ov5pvsw3yluhkta/node_modules/@prisma/orm-family-sql/family/control", { with: { "resolution-mode": "import" } }).SqlMigrationPlanOperation<import("../../../../../node_modules/.pnpm/@prisma+orm-target-postgres@8.0.0-rc.8_@prisma+cli-engine@0.2.3_magicast@0.5.4__magicast@0.5._xq3kzr6q7csigz6m2qyu2pgxoi/node_modules/@prisma/orm-target-postgres/dist/planner-target-details-HkP4RrRO-_xPQVPF0.mjs", { with: { "resolution-mode": "import" } }).t>>[];
}
//# sourceMappingURL=migration.d.ts.map