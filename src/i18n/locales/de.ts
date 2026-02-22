import type { LanguageMetadata, LanguageTranslation } from '../types';

export const de: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'Neu',
            browse: 'Öffnen',
            tables: 'Tabellen',
            refs: 'Refs',
            dependencies: 'Abhängigkeiten',
            custom_types: 'Benutzerdefinierte Typen',
            visuals: 'Darstellungen',
        },
        menu: {
            actions: {
                actions: 'Aktionen',
                new: 'Neu...',
                browse: 'Alle Datenbanken...',
                save: 'Speichern',
                import: 'Datenbank importieren',
                export_sql: 'SQL exportieren',
                export_as: 'Exportieren als',
                delete_diagram: 'Löschen',
            },
            edit: {
                edit: 'Bearbeiten',
                undo: 'Rückgängig',
                redo: 'Wiederholen',
                clear: 'Leeren',
            },
            view: {
                view: 'Ansicht',
                show_sidebar: 'Seitenleiste anzeigen',
                hide_sidebar: 'Seitenleiste ausblenden',
                hide_cardinality: 'Kardinalität ausblenden',
                show_cardinality: 'Kardinalität anzeigen',
                hide_field_attributes: 'Feldattribute ausblenden',
                show_field_attributes: 'Feldattribute anzeigen',
                zoom_on_scroll: 'Zoom beim Scrollen',
                show_views: 'Datenbankansichten',
                theme: 'Stil',
                show_dependencies: 'Abhängigkeiten anzeigen',
                hide_dependencies: 'Abhängigkeiten ausblenden',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            backup: {
                backup: 'Sicherung',
                export_diagram: 'Diagramm exportieren',
                restore_diagram: 'Diagramm wiederherstellen',
            },
            help: {
                help: 'Hilfe',
                docs_website: 'Dokumentation',
                join_discord: 'Auf Discord beitreten',
            },
        },

        profile_dialog: {
            title: 'Profil',
            description:
                'Sehen Sie sich Ihre Kontoeinstellungen an und aktualisieren Sie sie.',
            fields: {
                email: 'E-Mail',
                nickname: 'Spitzname',
                joined: 'Beigetreten',
                profile_image: 'Profilbild',
                current_password: 'Aktuelles Passwort',
                new_password: 'Neues Passwort',
                confirm_new_password: 'Neues Passwort bestätigen',
            },
            hints: {
                profile_image: 'Nur Bilddateien, bis zu 5 MB.',
            },
            actions: {
                logout: 'Abmelden',
                logging_out: 'Abmelden...',
                cancel: 'Abbrechen',
                save_changes: 'Änderungen speichern',
                saving: 'Speichern...',
            },
            errors: {
                image_type: 'Es sind nur Bilddateien erlaubt.',
                image_size: 'Das Profilbild darf höchstens 5 MB groß sein.',
                nickname_required: 'Spitzname ist erforderlich.',
                current_password_required:
                    'Aktuelles Passwort ist erforderlich.',
                new_password_required: 'Neues Passwort ist erforderlich.',
                new_password_length:
                    'Neues Passwort muss mindestens 6 Zeichen lang sein.',
                password_confirmation_mismatch:
                    'Bestätigung des neuen Passworts stimmt nicht überein.',
                update_failed: 'Profil konnte nicht aktualisiert werden.',
                signout_failed: 'Abmeldung fehlgeschlagen.',
            },
            toasts: {
                password_update_failed: {
                    title: 'Passwortaktualisierung fehlgeschlagen',
                    description_with_error:
                        'Profiländerungen wurden gespeichert. {{error}}',
                    description_without_error:
                        'Profiländerungen wurden gespeichert, aber die Passwortaktualisierung ist fehlgeschlagen.',
                },
                avatar_upload_failed: {
                    title: 'Avatar-Upload fehlgeschlagen',
                    description_fallback:
                        'Änderungen an Nickname und Passwort wurden weiterhin übernommen.',
                },
                profile_updated: {
                    title: 'Profil aktualisiert',
                    description: 'Ihre Profiländerungen wurden gespeichert.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'Diagramm teilen',
        },

        share_dialog: {
            title: 'Diagramm teilen',
            description:
                'Laden Sie Mitarbeiter als Redakteure oder Betrachter ein.',
            access: {
                title: 'Ihr Zugang',
                readonly_hint:
                    'Nur der Eigentümer kann Mitglieder und Einladungen verwalten.',
            },
            roles: {
                owner: 'Eigentümer',
                editor: 'Herausgeber',
                viewer: 'Zuschauer',
            },
            status: {
                pending: 'Ausstehend',
                accepted: 'Akzeptiert',
                revoked: 'Widerrufen',
                expired: 'Abgelaufen',
            },
            invite: {
                section_title: 'Per E-Mail einladen',
                email_placeholder: 'teammate@example.com',
            },
            members: {
                section_title: 'Mitglieder',
                empty: 'Noch keine eingeladenen Mitglieder.',
            },
            invitations: {
                section_title: 'Ausstehende Einladungen',
                empty: 'Keine ausstehenden Einladungen.',
            },
            history: {
                section_title: 'Einladungsverlauf',
                empty: 'Noch keine Einladungen.',
            },
            actions: {
                invite: 'Einladen',
                remove: 'Entfernen',
                revoke: 'Widerrufen',
                copy_link: 'Link kopieren',
                refresh: 'Aktualisieren',
                close: 'Schließen',
            },
            labels: {
                your_access: 'Ihr Zugang:',
                expires: 'Läuft ab',
                updated: 'Aktualisiert',
            },
            toasts: {
                invite_created: {
                    title: 'Einladung erstellt',
                    description: '{{email}} wurde als {{role}} eingeladen.',
                },
                invite_failed: {
                    title: 'Einladung fehlgeschlagen',
                },
                role_update_failed: {
                    title: 'Rollenaktualisierung fehlgeschlagen',
                },
                remove_failed: {
                    title: 'Mitglied entfernen fehlgeschlagen',
                },
                revoke_failed: {
                    title: 'Einladung widerrufen fehlgeschlagen',
                },
                copy_success: {
                    title: 'Einladungslink kopiert',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'Kopieren fehlgeschlagen',
                    description:
                        'Der Einladungslink konnte nicht kopiert werden.',
                },
            },
            errors: {
                email_required: 'E-Mail ist erforderlich.',
                unknown_error: 'Unbekannter Fehler.',
                no_diagram_selected: 'Es ist kein Diagramm ausgewählt.',
            },
        },

        auth_gate: {
            title: 'Melden Sie sich bei ERDS an',
            subtitle:
                'Ihre Diagramme werden in Ihrem Supabase-Konto gespeichert.',
            tabs: {
                sign_in: 'Anmelden',
                sign_up: 'Melden Sie sich an',
            },
            placeholders: {
                nickname: 'Spitzname',
                email: 'you@example.com',
                password: 'Passwort',
                confirm_password: 'Passwort bestätigen',
            },
            actions: {
                sign_in: 'Anmelden',
                signing_in: 'Anmelden...',
                create_account: 'Konto erstellen',
                creating_account: 'Konto erstellen...',
            },
            alerts: {
                supabase_not_configured_title:
                    'Supabase ist nicht konfiguriert',
                supabase_not_configured_description:
                    'Fügen Sie die Umgebungsvariablen SUPABASE_URL und SUPABASE_PUBLISHABLE_DEFAULT_KEY hinzu, um fortzufahren.',
                success_title: 'Erfolg',
                authentication_failed_title: 'Authentifizierung fehlgeschlagen',
            },
            validation: {
                email_and_password_required:
                    'E-Mail und Passwort sind erforderlich.',
                nickname_required: 'Spitzname ist erforderlich.',
                email_required: 'E-Mail ist erforderlich.',
                password_required: 'Passwort ist erforderlich.',
                password_min_length:
                    'Das Passwort muss mindestens 6 Zeichen lang sein.',
                password_confirmation_mismatch:
                    'Passwortbestätigung stimmt nicht überein.',
                sign_in_failed: 'Anmeldung fehlgeschlagen.',
                create_account_failed: 'Konto konnte nicht erstellt werden.',
            },
            success: {
                account_created:
                    'Konto erstellt. Wenn die E-Mail-Bestätigung aktiviert ist, überprüfen Sie Ihren Posteingang, bevor Sie sich anmelden.',
            },
        },

        invite_accept_page: {
            loading: 'Einladung annehmen...',
            error_title: 'Einladung konnte nicht angenommen werden',
            actions: {
                retry: 'Wiederholen',
                go_to_app: 'Zur App gehen',
            },
            errors: {
                expired: 'Dieser Einladungslink ist abgelaufen.',
                mismatch:
                    'Diese Einladung wurde an ein anderes E-Mail-Konto gesendet.',
                revoked: 'Diese Einladung wurde widerrufen.',
                not_pending: 'Diese Einladung ist nicht mehr aktiv.',
                not_found: 'Einladung nicht gefunden.',
                token_missing: 'Einladungstoken fehlt.',
                supabase_not_configured: 'Supabase ist nicht konfiguriert.',
                accept_failed: 'Einladung konnte nicht angenommen werden.',
                unknown_error: 'Unbekannter Fehler.',
                no_diagram_returned:
                    'Einladung angenommen, aber es wurde kein Diagramm zurückgegeben.',
                invitee_email_required:
                    'Die E-Mail-Adresse der eingeladenen Person ist erforderlich.',
            },
        },

        collab_presence: {
            online_count: '{{count}} online',
            role: {
                owner: 'Eigentümer',
                editor: 'Herausgeber',
                viewer: 'Zuschauer',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'Cloud-Synchronisierung wiederhergestellt',
            restored_description:
                'Änderungen werden erneut mit Supabase synchronisiert.',
            paused_title: 'Cloud-Synchronisierung angehalten',
            paused_description:
                'Ihre lokalen Änderungen sind sicher und werden automatisch wiederholt.',
            read_only_title: 'Lesezugriff',
            read_only_description:
                'Sie können dieses freigegebene Diagramm anzeigen, aber keine Änderungen speichern.',
            access_removed_title: 'Zugriff entfernt',
            access_removed_description:
                'Ihr Zugriff auf dieses freigegebene Diagramm wurde entfernt.',
        },

        collaboration_errors: {
            expired: 'Dieser Einladungslink ist abgelaufen.',
            mismatch:
                'Diese Einladung wurde an ein anderes E-Mail-Konto gesendet.',
            revoked: 'Diese Einladung wurde widerrufen.',
            not_pending: 'Diese Einladung ist nicht mehr aktiv.',
            not_found: 'Einladung nicht gefunden.',
            invitee_email_required:
                'Die E-Mail-Adresse der eingeladenen Person ist erforderlich.',
            token_missing: 'Einladungstoken ist erforderlich.',
            supabase_not_configured: 'Supabase ist nicht konfiguriert.',
        },

        delete_diagram_alert: {
            title: 'Diagramm löschen',
            description:
                'Diese Aktion kann nicht rückgängig gemacht werden. Das Diagramm wird dauerhaft gelöscht.',
            cancel: 'Abbrechen',
            delete: 'Löschen',
        },

        clear_diagram_alert: {
            title: 'Diagramm leeren',
            description:
                'Diese Aktion kann nicht rückgängig gemacht werden. Alle Daten im Diagramm werden dauerhaft gelöscht.',
            cancel: 'Abbrechen',
            clear: 'Leeren',
        },

        reorder_diagram_alert: {
            title: 'Diagramm automatisch anordnen',
            description:
                'Diese Aktion wird alle Tabellen im Diagramm neu anordnen. Möchten Sie fortfahren?',
            reorder: 'Automatisch anordnen',
            cancel: 'Abbrechen',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'Kopieren fehlgeschlagen',
                description: 'Zwischenablage nicht unterstützt',
            },
            failed: {
                title: 'Kopieren fehlgeschlagen',
                description:
                    'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
            },
        },

        theme: {
            system: 'System',
            light: 'Hell',
            dark: 'Dunkel',
        },

        zoom: {
            on: 'Ein',
            off: 'Aus',
        },

        last_saved: 'Zuletzt gespeichert',
        saved: 'Gespeichert',
        loading_diagram: 'Diagramm wird geladen...',
        deselect_all: 'Alles abwählen',
        select_all: 'Alles auswählen',
        clear: 'Leeren',
        show_more: 'Mehr anzeigen',
        show_less: 'Weniger anzeigen',
        copy_to_clipboard: 'In die Zwischenablage kopieren',
        copied: 'Kopiert!',

        side_panel: {
            view_all_options: 'Alle Optionen anzeigen...',
            tables_section: {
                tables: 'Tabellen',
                add_table: 'Tabelle hinzufügen',
                add_view: 'Ansicht hinzufügen',
                filter: 'Filter',
                collapse: 'Alle einklappen',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'Alle Tabellen sind ausgeblendet',
                show_all: 'Alle anzeigen',

                table: {
                    fields: 'Felder',
                    nullable: 'Nullable?',
                    primary_key: 'Primärschlüssel',
                    indexes: 'Indizes',
                    check_constraints: 'Prüfbedingungen',
                    comments: 'Kommentare',
                    no_comments: 'Keine Kommentare',
                    add_field: 'Feld hinzufügen',
                    add_index: 'Index hinzufügen',
                    add_check: 'Prüfung hinzufügen',
                    index_select_fields: 'Felder auswählen',
                    no_types_found: 'Keine Datentypen gefunden',
                    field_name: 'Name',
                    field_type: 'Datentyp',
                    field_actions: {
                        title: 'Feldattribute',
                        unique: 'Eindeutig',
                        auto_increment: 'Automatisch hochzählen',
                        comments: 'Kommentare',
                        no_comments: 'Keine Kommentare',
                        delete_field: 'Feld löschen',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'Präzision',
                        scale: 'Skalierung',
                    },
                    index_actions: {
                        title: 'Indexattribute',
                        name: 'Name',
                        unique: 'Eindeutig',
                        index_type: 'Indextyp',
                        delete_index: 'Index löschen',
                    },
                    check_constraint_actions: {
                        title: 'Prüfbedingung',
                        expression: 'Ausdruck',
                        delete: 'Prüfbedingung löschen',
                    },
                    table_actions: {
                        title: 'Tabellenaktionen',
                        change_schema: 'Schema ändern',
                        add_field: 'Feld hinzufügen',
                        add_index: 'Index hinzufügen',
                        duplicate_table: 'Duplicate Table', // TODO: Translate
                        delete_table: 'Tabelle löschen',
                    },
                },
                empty_state: {
                    title: 'Keine Tabellen',
                    description: 'Erstellen Sie eine Tabelle, um zu beginnen',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'Filter',
                collapse: 'Alle einklappen',
                add_relationship: 'Beziehung hinzufügen',
                relationships: 'Beziehungen',
                dependencies: 'Abhängigkeiten',
                relationship: {
                    relationship: 'Beziehung',
                    primary: 'Primäre Tabelle',
                    foreign: 'Verknüpfte Tabelle',
                    cardinality: 'Kardinalität',
                    delete_relationship: 'Löschen',
                    switch_tables: 'Tabellen tauschen',
                    relationship_actions: {
                        title: 'Aktionen',
                        delete_relationship: 'Löschen',
                    },
                },
                dependency: {
                    dependency: 'Abhängigkeit',
                    table: 'Tabelle',
                    dependent_table: 'Abhängige Ansicht',
                    delete_dependency: 'Löschen',
                    dependency_actions: {
                        title: 'Aktionen',
                        delete_dependency: 'Löschen',
                    },
                },
                empty_state: {
                    title: 'Keine Beziehungen',
                    description: 'Erstellen Sie eine Beziehung, um zu beginnen',
                },
            },

            areas_section: {
                areas: 'Bereiche',
                add_area: 'Bereich hinzufügen',
                filter: 'Filter',
                clear: 'Filter löschen',
                no_results:
                    'Keine Bereiche gefunden, die Ihrem Filter entsprechen.',

                area: {
                    area_actions: {
                        title: 'Bereich-Aktionen',
                        edit_name: 'Name bearbeiten',
                        delete_area: 'Bereich löschen',
                    },
                },
                empty_state: {
                    title: 'Keine Bereiche',
                    description: 'Erstellen Sie einen Bereich, um zu beginnen',
                },
            },

            visuals_section: {
                visuals: 'Darstellungen',
                tabs: {
                    areas: 'Bereiche',
                    notes: 'Notizen',
                },
            },

            notes_section: {
                filter: 'Filter',
                add_note: 'Notiz hinzufügen',
                no_results: 'Keine Notizen gefunden',
                clear: 'Filter löschen',
                empty_state: {
                    title: 'Keine Notizen',
                    description:
                        'Erstellen Sie eine Notiz, um Textanmerkungen auf der Leinwand hinzuzufügen',
                },
                note: {
                    empty_note: 'Leere Notiz',
                    note_actions: {
                        title: 'Notiz-Aktionen',
                        edit_content: 'Inhalt bearbeiten',
                        delete_note: 'Notiz löschen',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'Benutzerdefinierte Typen',
                filter: 'Filter',
                clear: 'Filter löschen',
                no_results:
                    'Keine benutzerdefinierten Typen gefunden, die Ihrem Filter entsprechen.',
                new_type: 'Neuer Typ',
                empty_state: {
                    title: 'Keine benutzerdefinierten Typen',
                    description:
                        'Benutzerdefinierte Typen werden hier angezeigt, wenn sie in Ihrer Datenbank verfügbar sind',
                },
                custom_type: {
                    kind: 'Art',
                    enum_values: 'Enum-Werte',
                    composite_fields: 'Felder',
                    no_fields: 'Keine Felder definiert',
                    no_values: 'Keine Enum-Werte definiert',
                    field_name_placeholder: 'Feldname',
                    field_type_placeholder: 'Typ auswählen',
                    add_field: 'Feld hinzufügen',
                    no_fields_tooltip:
                        'Keine Felder für diesen benutzerdefinierten Typ definiert',
                    custom_type_actions: {
                        title: 'Aktionen',
                        highlight_fields: 'Felder hervorheben',
                        delete_custom_type: 'Löschen',
                        clear_field_highlight: 'Hervorhebung entfernen',
                    },
                    delete_custom_type: 'Typ löschen',
                },
            },
        },

        toolbar: {
            zoom_in: 'Vergrößern',
            zoom_out: 'Verkleinern',
            save: 'Speichern',
            show_all: 'Alle anzeigen',
            undo: 'Rückgängig',
            redo: 'Wiederholen',
            reorder_diagram: 'Diagramm automatisch anordnen',

            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'Überlappende Tabellen hervorheben',
            filter: 'Tabellen filtern',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'Welche Datenbank verwenden Sie?',
                description:
                    'Jede Datenbank hat ihre eigenen Funktionen und Möglichkeiten.',
                check_examples_long: 'Beispiele ansehen',
                check_examples_short: 'Beispiele',
            },

            import_database: {
                title: 'Datenbank importieren',
                database_edition: 'Datenbank Edition:',
                step_1: 'Führen Sie dieses Skript in Ihrer Datenbank aus:',
                step_2: 'Fügen Sie das Skriptergebnis hier ein →',
                script_results_placeholder: 'Skriptergebnisse hier...',
                ssms_instructions: {
                    button_text: 'SSMS Anweisungen',
                    title: 'Anweisungen',
                    step_1: 'Gehen Sie zu Tools > Optionen > Abfrageergebnisse > SQL Server.',
                    step_2: 'Wenn Sie "Ergebnisse in Raster" verwenden, ändern Sie die maximale Zeichenanzahl für Nicht-XML-Daten (auf 9999999 setzen).',
                },
                instructions_link: 'Brauchen Sie Hilfe? So geht’s',
                check_script_result: 'Skriptergebnis überprüfen',
            },

            cancel: 'Abbrechen',
            back: 'Zurück',
            // TODO: Translate
            import_from_file: 'Import from File',
            empty_diagram: 'Leere Datenbank',
            continue: 'Weiter',
            import: 'Importieren',
        },

        open_diagram_dialog: {
            title: 'Datenbank öffnen',
            description: 'Wählen Sie ein Diagramm aus der Liste unten aus.',
            table_columns: {
                name: 'Name',
                created_at: 'Erstellt am',
                last_modified: 'Zuletzt geändert',
                tables_count: 'Tabellen',
            },
            cancel: 'Abbrechen',
            open: 'Öffnen',
            new_database: 'Neue Datenbank',

            diagram_actions: {
                open: 'Öffnen',
                duplicate: 'Duplizieren',
                delete: 'Löschen',
            },
        },

        export_sql_dialog: {
            title: 'SQL exportieren',
            description:
                'Exportieren Sie das Schema Ihres Diagramms in ein {{databaseType}} Skript',
            close: 'Schließen',
            loading: {
                text: 'Die KI generiert SQL für {{databaseType}}...',
                description: 'Dies sollte bis zu 30 Sekunden dauern.',
            },
            error: {
                message:
                    'Fehler beim Generieren des SQL-Skripts. Bitte versuchen Sie es später erneut oder <0>kontaktieren Sie uns</0>.',
                description:
                    'Verwenden Sie Ihren OPENAI_TOKEN, siehe Anleitung <0>hier</0>.',
            },
        },

        create_relationship_dialog: {
            title: 'Beziehung erstellen',
            primary_table: 'Primäre Tabelle',
            primary_field: 'Primäres Feld',
            referenced_table: 'Referenzierte Tabelle',
            referenced_field: 'Referenziertes Feld',
            primary_table_placeholder: 'Tabelle auswählen',
            primary_field_placeholder: 'Feld auswählen',
            referenced_table_placeholder: 'Tabelle auswählen',
            referenced_field_placeholder: 'Feld auswählen',
            no_tables_found: 'Keine Tabellen gefunden',
            no_fields_found: 'Keine Felder gefunden',
            create: 'Erstellen',
            cancel: 'Abbrechen',
        },

        import_database_dialog: {
            title: 'In aktuelles Diagramm importieren',
            override_alert: {
                title: 'Datenbank importieren',
                content: {
                    alert: 'Das Importieren dieses Diagramms wird vorhandene Tabellen und Beziehungen beeinflussen.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> neue Tabellen werden hinzugefügt.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> neue Beziehungen werden erstellt.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> Tabellen werden überschrieben.',
                    proceed: 'Möchten Sie fortfahren?',
                },
                import: 'Importieren',
                cancel: 'Abbrechen',
            },
        },

        export_image_dialog: {
            title: 'Bild exportieren',
            description: 'Wählen Sie den Skalierungsfaktor für den Export:',
            scale_1x: '1x (Niedrige Qualität)',
            scale_2x: '2x (Normale Qualität)',
            scale_4x: '4x (Beste Qualität)',
            cancel: 'Abbrechen',
            export: 'Exportieren',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'Schema auswählen',
            description:
                'Mehrere Schemas sind derzeit angezeigt. Wählen Sie eines für die neue Tabelle aus.',
            cancel: 'Abbrechen',
            confirm: 'Bestätigen',
        },

        update_table_schema_dialog: {
            title: 'Schema ändern',
            description: 'Schema der Tabelle "{{tableName}}" ändern',
            cancel: 'Abbrechen',
            confirm: 'Ändern',
        },
        create_table_schema_dialog: {
            title: 'Neues Schema erstellen',
            description:
                'Es existieren noch keine Schemas. Erstellen Sie Ihr erstes Schema, um Ihre Tabellen zu organisieren.',
            create: 'Erstellen',
            cancel: 'Abbrechen',
        },

        star_us_dialog: {
            title: 'Hilf uns, uns zu verbessern!',
            description:
                'Gefällt Ihnen ERDS? Lassen Sie es uns wissen und helfen Sie uns, ERDS zu verbessern!',
            close: 'Nicht jetzt',
            confirm: 'Natürlich!',
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
            one_to_one: 'Ein zu Eins (1:1)',
            one_to_many: 'Ein zu Viele (1:n)',
            many_to_one: 'Viele zu Eins (n:1)',
            many_to_many: 'Viele zu Viele (n:m)',
        },

        canvas_context_menu: {
            new_table: 'Neue Tabelle',
            new_view: 'Neue Ansicht',
            new_relationship: 'Neue Beziehung',
            new_area: 'Neuer Bereich',
            new_note: 'Neue Notiz',
        },

        table_node_context_menu: {
            edit_table: 'Tabelle bearbeiten',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            delete_table: 'Tabelle löschen',
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'Alle Tabellen sind ausgeblendet',
            show_all_tables: 'Alle anzeigen',
        },

        canvas_filter: {
            title: 'Tabellen filtern',
            search_placeholder: 'Tabellen suchen...',
            group_by_schema: 'Nach Schema gruppieren',
            group_by_area: 'Nach Bereich gruppieren',
            no_tables_found: 'Keine Tabellen gefunden',
            empty_diagram_description:
                'Erstellen Sie eine Tabelle, um zu beginnen',
            no_tables_description:
                'Versuchen Sie, Ihre Suche oder Filter anzupassen',
            clear_filter: 'Filter löschen',
        },

        // TODO: Add translations
        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        tool_tips: {
            double_click_to_edit: 'Doppelklicken zum Bearbeiten',
        },

        language_select: {
            change_language: 'Sprache',
        },

        on: 'Ein',
        off: 'Aus',
    },
};

export const deMetadata: LanguageMetadata = {
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
};
