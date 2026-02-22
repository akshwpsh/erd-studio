import type { LanguageMetadata, LanguageTranslation } from '../types';

export const es: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'Nuevo',
            browse: 'Abrir',
            tables: 'Tablas',
            refs: 'Refs',
            dependencies: 'Dependencias',
            custom_types: 'Tipos Personalizados',
            visuals: 'Visuales',
        },
        menu: {
            actions: {
                actions: 'Acciones',
                new: 'Nuevo...',
                browse: 'Todas las bases de datos...',
                save: 'Guardar',
                import: 'Importar Base de Datos',
                export_sql: 'Exportar SQL',
                export_as: 'Exportar como',
                delete_diagram: 'Eliminar',
            },
            edit: {
                edit: 'Editar',
                undo: 'Deshacer',
                redo: 'Rehacer',
                clear: 'Limpiar',
            },
            view: {
                view: 'Ver',
                hide_cardinality: 'Ocultar Cardinalidad',
                show_cardinality: 'Mostrar Cardinalidad',
                show_field_attributes: 'Mostrar Atributos de Campo',
                hide_field_attributes: 'Ocultar Atributos de Campo',
                show_sidebar: 'Mostrar Barra Lateral',
                hide_sidebar: 'Ocultar Barra Lateral',
                zoom_on_scroll: 'Zoom al Desplazarse',
                show_views: 'Vistas de Base de Datos',
                theme: 'Tema',
                show_dependencies: 'Mostrar dependencias',
                hide_dependencies: 'Ocultar dependencias',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            backup: {
                backup: 'Respaldo',
                export_diagram: 'Exportar Diagrama',
                restore_diagram: 'Restaurar Diagrama',
            },
            help: {
                help: 'Ayuda',
                docs_website: 'Documentación',
                join_discord: 'Únete a nosotros en Discord',
            },
        },

        profile_dialog: {
            title: 'Perfil',
            description: 'Ver y actualizar la configuración de su cuenta.',
            fields: {
                email: 'Correo electrónico',
                nickname: 'Apodo',
                joined: 'Se unió',
                profile_image: 'Imagen de perfil',
                current_password: 'Contraseña actual',
                new_password: 'Nueva contraseña',
                confirm_new_password: 'Confirmar nueva contraseña',
            },
            hints: {
                profile_image: 'Sólo archivos de imagen, hasta 5 MB.',
            },
            actions: {
                logout: 'Cerrar sesión',
                logging_out: 'Cerrando sesión...',
                cancel: 'Cancelar',
                save_changes: 'Guardar cambios',
                saving: 'Guardando...',
            },
            errors: {
                image_type: 'Sólo se permiten archivos de imagen.',
                image_size: 'La imagen del perfil debe tener 5 MB o menos.',
                nickname_required: 'Se requiere apodo.',
                current_password_required: 'Se requiere la contraseña actual.',
                new_password_required: 'Se requiere una nueva contraseña.',
                new_password_length:
                    'La nueva contraseña debe tener al menos 6 caracteres.',
                password_confirmation_mismatch:
                    'La confirmación de la nueva contraseña no coincide.',
                update_failed: 'No se pudo actualizar el perfil.',
                signout_failed: 'No se pudo cerrar sesión.',
            },
            toasts: {
                password_update_failed: {
                    title: 'Error al actualizar la contraseña',
                    description_with_error:
                        'Se guardaron los cambios del perfil. {{error}}',
                    description_without_error:
                        'Se guardaron los cambios del perfil, pero falló la actualización de la contraseña.',
                },
                avatar_upload_failed: {
                    title: 'Falló la carga del avatar',
                    description_fallback:
                        'Aún se aplicaron los cambios de apodo y contraseña.',
                },
                profile_updated: {
                    title: 'Perfil actualizado',
                    description: 'Los cambios de tu perfil se han guardado.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'Compartir diagrama',
        },

        share_dialog: {
            title: 'Compartir diagrama',
            description: 'Invita a colaboradores como editores o espectadores.',
            access: {
                title: 'Tu acceso',
                readonly_hint:
                    'Solo el propietario puede administrar miembros e invitaciones.',
            },
            roles: {
                owner: 'Propietario',
                editor: 'Editora',
                viewer: 'Visor',
            },
            status: {
                pending: 'Pendiente',
                accepted: 'Aceptado',
                revoked: 'Revocado',
                expired: 'Caducado',
            },
            invite: {
                section_title: 'Invitar por correo electrónico',
                email_placeholder: 'compañero de equipo@ejemplo.com',
            },
            members: {
                section_title: 'Miembros',
                empty: 'Aún no hay miembros invitados.',
            },
            invitations: {
                section_title: 'Invitaciones pendientes',
                empty: 'No hay invitaciones pendientes.',
            },
            history: {
                section_title: 'Historial de invitaciones',
                empty: 'Aún no hay invitaciones.',
            },
            actions: {
                invite: 'Invitar',
                remove: 'Eliminar',
                revoke: 'Revocar',
                copy_link: 'Copiar enlace',
                refresh: 'Actualizar',
                close: 'Cerrar',
            },
            labels: {
                your_access: 'Tu acceso:',
                expires: 'Expira',
                updated: 'Actualizado',
            },
            toasts: {
                invite_created: {
                    title: 'Invitación creada',
                    description: '{{email}} fue invitado como {{role}}.',
                },
                invite_failed: {
                    title: 'La invitación falló',
                },
                role_update_failed: {
                    title: 'Falló la actualización del rol',
                },
                remove_failed: {
                    title: 'Error al eliminar miembro',
                },
                revoke_failed: {
                    title: 'Error al revocar la invitación',
                },
                copy_success: {
                    title: 'Enlace de invitación copiado',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'Copia fallida',
                    description: 'No se pudo copiar el enlace de invitación.',
                },
            },
            errors: {
                email_required: 'Se requiere correo electrónico.',
                unknown_error: 'Error desconocido.',
                no_diagram_selected: 'No se ha seleccionado ningún diagrama.',
            },
        },

        auth_gate: {
            title: 'Inicia sesión en ERDS',
            subtitle: 'Sus diagramas se almacenan en su cuenta Supabase.',
            tabs: {
                sign_in: 'Iniciar sesión',
                sign_up: 'Regístrate',
            },
            placeholders: {
                nickname: 'Apodo',
                email: 'you@example.com',
                password: 'Contraseña',
                confirm_password: 'Confirmar contraseña',
            },
            actions: {
                sign_in: 'Iniciar sesión',
                signing_in: 'Iniciando sesión...',
                create_account: 'Crear cuenta',
                creating_account: 'Creando cuenta...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase no está configurado',
                supabase_not_configured_description:
                    'Agregue las variables de entorno SUPABASE_URL y SUPABASE_PUBLISHABLE_DEFAULT_KEY para continuar.',
                success_title: 'Éxito',
                authentication_failed_title: 'Error de autenticación',
            },
            validation: {
                email_and_password_required:
                    'Se requiere correo electrónico y contraseña.',
                nickname_required: 'Se requiere apodo.',
                email_required: 'Se requiere correo electrónico.',
                password_required: 'Se requiere contraseña.',
                password_min_length:
                    'La contraseña debe tener al menos 6 caracteres.',
                password_confirmation_mismatch:
                    'La confirmación de contraseña no coincide.',
                sign_in_failed: 'No se pudo iniciar sesión.',
                create_account_failed: 'No se pudo crear la cuenta.',
            },
            success: {
                account_created:
                    'Cuenta creada. Si la confirmación por correo electrónico está habilitada, revise su bandeja de entrada antes de iniciar sesión.',
            },
        },

        invite_accept_page: {
            loading: 'Aceptando invitación...',
            error_title: 'No se pudo aceptar la invitación',
            actions: {
                retry: 'Reintentar',
                go_to_app: 'Ir a la aplicación',
            },
            errors: {
                expired: 'Este enlace de invitación ha caducado.',
                mismatch:
                    'Esta invitación se envió a una cuenta de correo electrónico diferente.',
                revoked: 'Esta invitación ha sido revocada.',
                not_pending: 'Esta invitación ya no está activa.',
                not_found: 'Invitación no encontrada.',
                token_missing: 'Falta el token de invitación.',
                supabase_not_configured: 'Supabase no está configurado.',
                accept_failed: 'No se pudo aceptar la invitación.',
                unknown_error: 'Error desconocido.',
                no_diagram_returned:
                    'Invitación aceptada, pero no se devolvió ningún diagrama.',
                invitee_email_required:
                    'Se requiere el correo electrónico del invitado.',
            },
        },

        collab_presence: {
            online_count: '{{count}} en línea',
            role: {
                owner: 'Propietario',
                editor: 'Editora',
                viewer: 'Visor',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'Sincronización en la nube restaurada',
            restored_description:
                'Los cambios se están sincronizando con Supabase nuevamente.',
            paused_title: 'Sincronización en la nube pausada',
            paused_description:
                'Sus cambios locales son seguros y se volverán a intentar automáticamente.',
            read_only_title: 'Acceso de sólo lectura',
            read_only_description:
                'Puede ver este diagrama compartido pero no puede guardar los cambios.',
            access_removed_title: 'Acceso eliminado',
            access_removed_description:
                'Se eliminó tu acceso a este diagrama compartido.',
        },

        collaboration_errors: {
            expired: 'Este enlace de invitación ha caducado.',
            mismatch:
                'Esta invitación se envió a una cuenta de correo electrónico diferente.',
            revoked: 'Esta invitación ha sido revocada.',
            not_pending: 'Esta invitación ya no está activa.',
            not_found: 'Invitación no encontrada.',
            invitee_email_required:
                'Se requiere el correo electrónico del invitado.',
            token_missing: 'Se requiere token de invitación.',
            supabase_not_configured: 'Supabase no está configurado.',
        },

        delete_diagram_alert: {
            title: 'Eliminar Diagrama',
            description:
                'Esta acción no se puede deshacer. Esto eliminará permanentemente el diagrama.',
            cancel: 'Cancelar',
            delete: 'Eliminar',
        },

        clear_diagram_alert: {
            title: 'Limpiar Diagrama',
            description:
                'Esta acción no se puede deshacer. Esto eliminará permanentemente todos los datos en el diagrama.',
            cancel: 'Cancelar',
            clear: 'Limpiar',
        },

        reorder_diagram_alert: {
            title: 'Organizar Diagrama Automáticamente',
            description:
                'Esta acción reorganizará todas las tablas en el diagrama. ¿Deseas continuar?',
            reorder: 'Organizar Automáticamente',
            cancel: 'Cancelar',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'Copia fallida',
                description: 'Portapapeles no soportado',
            },
            failed: {
                title: 'Copia fallida',
                description: 'Algo salió mal. Por favor, inténtelo de nuevo.',
            },
        },

        theme: {
            system: 'Sistema',
            light: 'Claro',
            dark: 'Oscuro',
        },

        zoom: {
            on: 'Encendido',
            off: 'Apagado',
        },

        last_saved: 'Último guardado',
        saved: 'Guardado',
        loading_diagram: 'Cargando diagrama...',
        deselect_all: 'Deseleccionar todo',
        select_all: 'Seleccionar todo',
        clear: 'Limpiar',
        show_more: 'Mostrar más',
        show_less: 'Mostrar menos',
        copy_to_clipboard: 'Copy to Clipboard',
        copied: 'Copied!',

        side_panel: {
            view_all_options: 'Ver todas las opciones...',
            tables_section: {
                tables: 'Tablas',
                add_table: 'Agregar Tabla',
                add_view: 'Agregar Vista',
                filter: 'Filtrar',
                collapse: 'Colapsar Todo',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'Todas las tablas están ocultas',
                show_all: 'Mostrar todo',

                table: {
                    fields: 'Campos',
                    nullable: '¿Opcional?',
                    primary_key: 'Clave Primaria',
                    indexes: 'Índices',
                    check_constraints: 'Restricciones de verificación',
                    comments: 'Comentarios',
                    no_comments: 'Sin comentarios',
                    add_field: 'Agregar Campo',
                    add_index: 'Agregar Índice',
                    add_check: 'Agregar verificación',
                    index_select_fields: 'Seleccionar campos',
                    field_name: 'Nombre',
                    field_type: 'Tipo',
                    no_types_found: 'No se encontraron tipos',
                    field_actions: {
                        title: 'Atributos del Campo',
                        unique: 'Único',
                        auto_increment: 'Autoincremento',
                        comments: 'Comentarios',
                        no_comments: 'Sin comentarios',
                        delete_field: 'Eliminar Campo',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'Precisión',
                        scale: 'Escala',
                    },
                    index_actions: {
                        title: 'Atributos del Índice',
                        name: 'Nombre',
                        unique: 'Único',
                        index_type: 'Tipo de Índice',
                        delete_index: 'Eliminar Índice',
                    },
                    check_constraint_actions: {
                        title: 'Restricción de verificación',
                        expression: 'Expresión',
                        delete: 'Eliminar restricción',
                    },
                    table_actions: {
                        title: 'Acciones de la Tabla',
                        change_schema: 'Cambiar Esquema',
                        add_field: 'Agregar Campo',
                        add_index: 'Agregar Índice',
                        duplicate_table: 'Duplicate Table', // TODO: Translate
                        delete_table: 'Eliminar Tabla',
                    },
                },
                empty_state: {
                    title: 'No hay tablas',
                    description: 'Crea una tabla para comenzar',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'Filtrar',
                collapse: 'Colapsar Todo',
                add_relationship: 'Agregar Relación',
                relationships: 'Relaciones',
                dependencies: 'Dependencias',
                relationship: {
                    relationship: 'Relación',
                    primary: 'Tabla Primaria',
                    foreign: 'Tabla Relacionada',
                    cardinality: 'Cardinalidad',
                    delete_relationship: 'Eliminar',
                    switch_tables: 'Intercambiar tablas',
                    relationship_actions: {
                        title: 'Acciones',
                        delete_relationship: 'Eliminar',
                    },
                },
                dependency: {
                    dependency: 'Dependencia',
                    table: 'Tabla',
                    dependent_table: 'Vista Dependiente',
                    delete_dependency: 'Eliminar',
                    dependency_actions: {
                        title: 'Acciones',
                        delete_dependency: 'Eliminar',
                    },
                },
                empty_state: {
                    title: 'Sin relaciones',
                    description: 'Crea una relación para comenzar',
                },
            },

            areas_section: {
                areas: 'Áreas',
                add_area: 'Agregar Área',
                filter: 'Filtrar',
                clear: 'Limpiar Filtro',
                no_results:
                    'No se encontraron áreas que coincidan con tu filtro.',

                area: {
                    area_actions: {
                        title: 'Acciones del Área',
                        edit_name: 'Editar Nombre',
                        delete_area: 'Eliminar Área',
                    },
                },
                empty_state: {
                    title: 'Sin áreas',
                    description: 'Crea un área para comenzar',
                },
            },

            visuals_section: {
                visuals: 'Visuales',
                tabs: {
                    areas: 'Áreas',
                    notes: 'Notas',
                },
            },

            notes_section: {
                filter: 'Filtrar',
                add_note: 'Agregar Nota',
                no_results: 'No se encontraron notas',
                clear: 'Limpiar Filtro',
                empty_state: {
                    title: 'Sin Notas',
                    description:
                        'Crea una nota para agregar anotaciones de texto en el lienzo',
                },
                note: {
                    empty_note: 'Nota vacía',
                    note_actions: {
                        title: 'Acciones de Nota',
                        edit_content: 'Editar Contenido',
                        delete_note: 'Eliminar Nota',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'Tipos Personalizados',
                filter: 'Filtrar',
                clear: 'Limpiar Filtro',
                no_results:
                    'No se encontraron tipos personalizados que coincidan con tu filtro.',
                new_type: 'Nuevo Tipo',
                empty_state: {
                    title: 'Sin tipos personalizados',
                    description:
                        'Los tipos personalizados aparecerán aquí cuando estén disponibles en tu base de datos',
                },
                custom_type: {
                    kind: 'Tipo',
                    enum_values: 'Valores Enum',
                    composite_fields: 'Campos',
                    no_fields: 'Sin campos definidos',
                    no_values: 'No hay valores de enum definidos',
                    field_name_placeholder: 'Nombre del campo',
                    field_type_placeholder: 'Seleccionar tipo',
                    add_field: 'Agregar Campo',
                    no_fields_tooltip:
                        'Sin campos definidos para este tipo personalizado',
                    custom_type_actions: {
                        title: 'Acciones',
                        highlight_fields: 'Resaltar Campos',
                        delete_custom_type: 'Eliminar',
                        clear_field_highlight: 'Quitar Resaltado',
                    },
                    delete_custom_type: 'Eliminar Tipo',
                },
            },
        },

        toolbar: {
            zoom_in: 'Acercar',
            zoom_out: 'Alejar',
            save: 'Guardar',
            show_all: 'Mostrar Todo',
            undo: 'Deshacer',
            redo: 'Rehacer',
            reorder_diagram: 'Organizar Diagrama Automáticamente',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'Resaltar tablas superpuestas',
            filter: 'Filtrar Tablas',
        },

        new_diagram_dialog: {
            database_selection: {
                title: '¿Cuál es tu Base de Datos?',
                description:
                    'Cada base de datos tiene sus propias características y capacidades únicas.',
                check_examples_long: 'Ver Ejemplos',
                check_examples_short: 'Ejemplos',
            },

            import_database: {
                title: 'Importa tu Base de Datos',
                database_edition: 'Edición de Base de Datos:',
                step_1: 'Ejecuta este script en tu base de datos:',
                step_2: 'Pega el resultado del script aquí →',
                script_results_placeholder: 'Resultados del script aquí...',
                ssms_instructions: {
                    button_text: 'Instrucciones SSMS',
                    title: 'Instrucciones',
                    step_1: 'Ve a Herramientas > Opciones > Resultados de Consulta > SQL Server.',
                    step_2: 'Si estás usando "Resultados en Cuadrícula", cambia el Máximo de Caracteres Recuperados para Datos No XML (configúralo en 9999999).',
                },
                instructions_link: '¿Necesitas ayuda? mira cómo',
                check_script_result: 'Revisa el resultado del script',
            },

            cancel: 'Cancelar',
            back: 'Atrás',
            // TODO: Translate
            import_from_file: 'Import from File',
            empty_diagram: 'Base de datos vacía',
            continue: 'Continuar',
            import: 'Importar',
        },

        open_diagram_dialog: {
            title: 'Abrir Base de Datos',
            description:
                'Selecciona un diagrama para abrir de la lista a continuación.',
            table_columns: {
                name: 'Nombre',
                created_at: 'Creado en',
                last_modified: 'Última modificación',
                tables_count: 'Tablas',
            },
            cancel: 'Cancelar',
            open: 'Abrir',
            new_database: 'Nueva Base de Datos',

            diagram_actions: {
                open: 'Abrir',
                duplicate: 'Duplicar',
                delete: 'Eliminar',
            },
        },

        export_sql_dialog: {
            title: 'Exportar SQL',
            description:
                'Exporta el esquema de tu diagrama a un script {{databaseType}}',
            close: 'Cerrar',
            loading: {
                text: 'La IA está generando SQL para {{databaseType}}...',
                description: 'Esto debería tomar hasta 30 segundos.',
            },
            error: {
                message:
                    'Error al generar el script SQL. Por favor, intenta nuevamente más tarde o <0>contáctanos</0>.',
                description:
                    'Siéntete libre de usar tu OPENAI_TOKEN, consulta el manual <0>aquí</0>.',
            },
        },

        create_relationship_dialog: {
            cancel: 'Cancelar',
            create: 'Crear',
            no_fields_found: 'No se encontraron campos',
            no_tables_found: 'No se encontraron tablas',
            primary_field: 'Campo Primario',
            primary_table: 'Tabla Primaria',
            primary_table_placeholder: 'Seleccionar tabla',
            primary_field_placeholder: 'Seleccionar campo',
            referenced_field: 'Campo Referenciado',
            referenced_field_placeholder: 'Seleccionar campo',
            referenced_table: 'Tabla Referenciada',
            referenced_table_placeholder: 'Seleccionar tabla',
            title: 'Crear Relación',
        },

        import_database_dialog: {
            title: 'Importar a Diagrama Actual',
            override_alert: {
                title: 'Importar Base de Datos',
                content: {
                    alert: 'Importar este diagrama afectará las tablas y relaciones existentes.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> nuevas tablas se agregarán.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> nuevas relaciones se crearán.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> tablas se sobrescribirán.',
                    proceed: '¿Deseas continuar?',
                },
                import: 'Importar',
                cancel: 'Cancelar',
            },
        },

        export_image_dialog: {
            title: 'Exportar imagen',
            description: 'Escoge el factor de escalamiento para exportar:',
            scale_1x: '1x (Baja calidad)',
            scale_2x: '2x (Calidad normal)',
            scale_4x: '4x (Mejor calidad)',
            cancel: 'Cancelar',
            export: 'Exportar',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'Seleccionar Esquema',
            description:
                'Actualmente se muestran múltiples esquemas. Selecciona uno para la nueva tabla.',
            cancel: 'Cancelar',
            confirm: 'Confirmar',
        },

        update_table_schema_dialog: {
            title: 'Cambiar Esquema',
            description: 'Actualizar esquema de la tabla "{{tableName}}"',
            cancel: 'Cancelar',
            confirm: 'Cambiar',
        },
        create_table_schema_dialog: {
            title: 'Crear Nuevo Esquema',
            description:
                'Aún no existen esquemas. Crea tu primer esquema para organizar tus tablas.',
            create: 'Crear',
            cancel: 'Cancelar',
        },

        star_us_dialog: {
            title: '¡Ayúdanos a mejorar!',
            description:
                '¿Te gusta ERDS? Por favor, danos una estrella en GitHub.',
            close: 'Ahora no',
            confirm: '¡Claro!',
        },

        // TODO: Translate
        export_diagram_dialog: {
            title: 'Export Diagram',
            description: 'Choose the format for export:',
            format_json: 'JSON',
            cancel: 'Cancel',
            export: 'Export',
            error: {
                title: 'Error exporting diagram',
                description:
                    'Something went wrong. Need help? support@chartdb.io',
            },
        },
        // TODO: Translate
        import_diagram_dialog: {
            title: 'Import Diagram',
            description: 'Paste the diagram JSON below:',
            cancel: 'Cancel',
            import: 'Import',
            error: {
                title: 'Error importing diagram',
                description:
                    'The diagram JSON is invalid. Please check the JSON and try again. Need help? support@chartdb.io',
            },
        },
        // TODO: Translate
        import_dbml_dialog: {
            example_title: 'Import Example DBML',
            title: 'Import DBML',
            description: 'Import a database schema from DBML format.',
            import: 'Import',
            cancel: 'Cancel',
            skip_and_empty: 'Skip & Empty',
            show_example: 'Show Example',
            error: {
                title: 'Error',
                description: 'Failed to parse DBML. Please check the syntax.',
            },
        },
        relationship_type: {
            one_to_one: 'Uno a Uno',
            one_to_many: 'Uno a Muchos',
            many_to_one: 'Muchos a Uno',
            many_to_many: 'Muchos a Muchos',
        },

        canvas_context_menu: {
            new_table: 'Nueva Tabla',
            new_view: 'Nueva Vista',
            new_relationship: 'Nueva Relación',
            new_area: 'Nueva Área',
            new_note: 'Nueva Nota',
        },

        table_node_context_menu: {
            edit_table: 'Editar Tabla',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            delete_table: 'Eliminar Tabla',
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'Todas las tablas están ocultas',
            show_all_tables: 'Mostrar todo',
        },

        canvas_filter: {
            title: 'Filtrar Tablas',
            search_placeholder: 'Buscar tablas...',
            group_by_schema: 'Agrupar por Esquema',
            group_by_area: 'Agrupar por Área',
            no_tables_found: 'No se encontraron tablas',
            empty_diagram_description: 'Crea una tabla para comenzar',
            no_tables_description: 'Intenta ajustar tu búsqueda o filtro',
            clear_filter: 'Limpiar filtro',
        },

        // TODO: Add translations
        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        tool_tips: {
            double_click_to_edit: 'Doble clic para editar',
        },

        language_select: {
            change_language: 'Idioma',
        },

        on: 'Encendido',
        off: 'Apagado',
    },
};

export const esMetadata: LanguageMetadata = {
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
};
