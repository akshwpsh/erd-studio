import type { LanguageMetadata } from '../types';

export const en = {
    translation: {
        editor_sidebar: {
            new_diagram: 'New',
            browse: 'Open',
            tables: 'Tables',
            refs: 'Refs',
            dependencies: 'Dependencies',
            custom_types: 'Custom Types',
            visuals: 'Visuals',
        },
        menu: {
            actions: {
                actions: 'Actions',
                new: 'New...',
                browse: 'All Databases...',
                save: 'Save',
                import: 'Import',
                export_sql: 'Export SQL',
                export_as: 'Export as',
                delete_diagram: 'Delete',
            },
            edit: {
                edit: 'Edit',
                undo: 'Undo',
                redo: 'Redo',
                clear: 'Clear',
            },
            view: {
                view: 'View',
                show_sidebar: 'Show Sidebar',
                hide_sidebar: 'Hide Sidebar',
                hide_cardinality: 'Hide Cardinality',
                show_cardinality: 'Show Cardinality',
                hide_field_attributes: 'Hide Field Attributes',
                show_field_attributes: 'Show Field Attributes',
                zoom_on_scroll: 'Zoom on Scroll',
                show_views: 'Database Views',
                theme: 'Theme',
                show_dependencies: 'Show Dependencies',
                hide_dependencies: 'Hide Dependencies',
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            backup: {
                backup: 'Backup',
                export_diagram: 'Export Diagram',
                restore_diagram: 'Restore Diagram',
            },
            help: {
                help: 'Help',
                docs_website: 'Docs',
                join_discord: 'Join us on Discord',
            },
        },

        profile_dialog: {
            title: 'Profile',
            description: 'View and update your account settings.',
            fields: {
                email: 'Email',
                nickname: 'Nickname',
                joined: 'Joined',
                profile_image: 'Profile image',
                current_password: 'Current password',
                new_password: 'New password',
                confirm_new_password: 'Confirm new password',
            },
            hints: {
                profile_image: 'Image files only, up to 5MB.',
            },
            actions: {
                logout: 'Log out',
                logging_out: 'Signing out...',
                cancel: 'Cancel',
                save_changes: 'Save changes',
                saving: 'Saving...',
            },
            errors: {
                image_type: 'Only image files are allowed.',
                image_size: 'Profile image must be 5MB or smaller.',
                nickname_required: 'Nickname is required.',
                current_password_required: 'Current password is required.',
                new_password_required: 'New password is required.',
                new_password_length:
                    'New password must be at least 6 characters.',
                password_confirmation_mismatch:
                    'New password confirmation does not match.',
                update_failed: 'Failed to update profile.',
                signout_failed: 'Failed to sign out.',
            },
            toasts: {
                password_update_failed: {
                    title: 'Password update failed',
                    description_with_error:
                        'Profile changes were saved. {{error}}',
                    description_without_error:
                        'Profile changes were saved, but password update failed.',
                },
                avatar_upload_failed: {
                    title: 'Avatar upload failed',
                    description_fallback:
                        'Nickname and password changes were still applied.',
                },
                profile_updated: {
                    title: 'Profile updated',
                    description: 'Your profile changes have been saved.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'Share diagram',
        },

        share_dialog: {
            title: 'Share diagram',
            description: 'Invite collaborators as editors or viewers.',
            access: {
                title: 'Your access',
                readonly_hint:
                    'Only the owner can manage members and invitations.',
            },
            roles: {
                owner: 'Owner',
                editor: 'Editor',
                viewer: 'Viewer',
            },
            status: {
                pending: 'Pending',
                accepted: 'Accepted',
                revoked: 'Revoked',
                expired: 'Expired',
            },
            invite: {
                section_title: 'Invite by email',
                email_placeholder: 'teammate@example.com',
            },
            members: {
                section_title: 'Members',
                empty: 'No invited members yet.',
            },
            invitations: {
                section_title: 'Pending invitations',
                empty: 'No pending invitations.',
            },
            history: {
                section_title: 'Invitation history',
                empty: 'No invitations yet.',
            },
            actions: {
                invite: 'Invite',
                remove: 'Remove',
                revoke: 'Revoke',
                copy_link: 'Copy link',
                refresh: 'Refresh',
                close: 'Close',
            },
            labels: {
                your_access: 'Your access:',
                expires: 'Expires',
                updated: 'Updated',
            },
            toasts: {
                invite_created: {
                    title: 'Invitation created',
                    description: '{{email}} was invited as {{role}}.',
                },
                invite_failed: {
                    title: 'Invite failed',
                },
                role_update_failed: {
                    title: 'Role update failed',
                },
                remove_failed: {
                    title: 'Remove member failed',
                },
                revoke_failed: {
                    title: 'Revoke invitation failed',
                },
                copy_success: {
                    title: 'Invite link copied',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'Copy failed',
                    description: 'Could not copy invite link.',
                },
            },
            errors: {
                email_required: 'Email is required.',
                unknown_error: 'Unknown error.',
                no_diagram_selected: 'No diagram is selected.',
            },
        },

        auth_gate: {
            title: 'Sign in to ERDS',
            subtitle: 'Your diagrams are stored in your Supabase account.',
            tabs: {
                sign_in: 'Sign in',
                sign_up: 'Sign up',
            },
            placeholders: {
                nickname: 'Nickname',
                email: 'you@example.com',
                password: 'Password',
                confirm_password: 'Confirm password',
            },
            actions: {
                sign_in: 'Sign in',
                signing_in: 'Signing in...',
                create_account: 'Create account',
                creating_account: 'Creating account...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase is not configured',
                supabase_not_configured_description:
                    'Add SUPABASE_URL and SUPABASE_PUBLISHABLE_DEFAULT_KEY environment variables to continue.',
                success_title: 'Success',
                authentication_failed_title: 'Authentication failed',
            },
            validation: {
                email_and_password_required: 'Email and password are required.',
                nickname_required: 'Nickname is required.',
                email_required: 'Email is required.',
                password_required: 'Password is required.',
                password_min_length: 'Password must be at least 6 characters.',
                password_confirmation_mismatch:
                    'Password confirmation does not match.',
                sign_in_failed: 'Failed to sign in.',
                create_account_failed: 'Failed to create account.',
            },
            success: {
                account_created:
                    'Account created. If email confirmation is enabled, check your inbox before signing in.',
            },
        },

        invite_accept_page: {
            loading: 'Accepting invitation...',
            error_title: 'Invitation could not be accepted',
            actions: {
                retry: 'Retry',
                go_to_app: 'Go to app',
            },
            errors: {
                expired: 'This invitation link has expired.',
                mismatch:
                    'This invitation was sent to a different email account.',
                revoked: 'This invitation has been revoked.',
                not_pending: 'This invitation is no longer active.',
                not_found: 'Invitation not found.',
                token_missing: 'Invitation token is missing.',
                supabase_not_configured: 'Supabase is not configured.',
                accept_failed: 'Failed to accept invitation.',
                unknown_error: 'Unknown error.',
                no_diagram_returned:
                    'Invitation accepted, but no diagram was returned.',
                invitee_email_required: 'Invitee email is required.',
            },
        },

        collab_presence: {
            online_count: '{{count}} online',
            role: {
                owner: 'Owner',
                editor: 'Editor',
                viewer: 'Viewer',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'Cloud sync restored',
            restored_description: 'Changes are syncing to Supabase again.',
            paused_title: 'Cloud sync paused',
            paused_description:
                'Your local changes are safe and will be retried automatically.',
            read_only_title: 'Read-only access',
            read_only_description:
                'You can view this shared diagram but cannot save changes.',
            access_removed_title: 'Access removed',
            access_removed_description:
                'Your access to this shared diagram was removed.',
        },

        collaboration_errors: {
            expired: 'This invitation link has expired.',
            mismatch: 'This invitation was sent to a different email account.',
            revoked: 'This invitation has been revoked.',
            not_pending: 'This invitation is no longer active.',
            not_found: 'Invitation not found.',
            invitee_email_required: 'Invitee email is required.',
            token_missing: 'Invitation token is required.',
            supabase_not_configured: 'Supabase is not configured.',
        },

        delete_diagram_alert: {
            title: 'Delete Diagram',
            description:
                'This action cannot be undone. This will permanently delete the diagram.',
            cancel: 'Cancel',
            delete: 'Delete',
        },

        clear_diagram_alert: {
            title: 'Clear Diagram',
            description:
                'This action cannot be undone. This will permanently delete all the data in the diagram.',
            cancel: 'Cancel',
            clear: 'Clear',
        },

        reorder_diagram_alert: {
            title: 'Auto Arrange Diagram',
            description:
                'This action will rearrange all tables in the diagram. Do you want to continue?',
            reorder: 'Auto Arrange',
            cancel: 'Cancel',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'Copy failed',
                description: 'Clipboard not supported.',
            },
            failed: {
                title: 'Copy failed',
                description: 'Something went wrong. Please try again.',
            },
        },

        theme: {
            system: 'System',
            light: 'Light',
            dark: 'Dark',
        },

        zoom: {
            on: 'On',
            off: 'Off',
        },

        last_saved: 'Last saved',
        saved: 'Saved',
        loading_diagram: 'Loading diagram...',
        deselect_all: 'Deselect All',
        select_all: 'Select All',
        clear: 'Clear',
        show_more: 'Show More',
        show_less: 'Show Less',
        copy_to_clipboard: 'Copy to Clipboard',
        copied: 'Copied!',

        side_panel: {
            view_all_options: 'View all Options...',
            tables_section: {
                tables: 'Tables',
                add_table: 'Add Table',
                add_view: 'Add View',
                filter: 'Filter',
                collapse: 'Collapse All',
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'All tables are hidden',
                show_all: 'Show all',

                table: {
                    fields: 'Fields',
                    nullable: 'Nullable?',
                    primary_key: 'Primary Key',
                    indexes: 'Indexes',
                    check_constraints: 'Check Constraints',
                    comments: 'Comments',
                    no_comments: 'No comments',
                    add_field: 'Add Field',
                    add_index: 'Add Index',
                    add_check: 'Add Check',
                    index_select_fields: 'Select fields',
                    no_types_found: 'No types found',
                    field_name: 'Name',
                    field_type: 'Type',
                    field_actions: {
                        title: 'Field Attributes',
                        unique: 'Unique',
                        auto_increment: 'Auto Increment',
                        character_length: 'Max Length',
                        precision: 'Precision',
                        scale: 'Scale',
                        comments: 'Comments',
                        no_comments: 'No comments',
                        default_value: 'Default Value',
                        no_default: 'No default',
                        delete_field: 'Delete Field',
                    },
                    index_actions: {
                        title: 'Index Attributes',
                        name: 'Name',
                        unique: 'Unique',
                        index_type: 'Index Type',
                        delete_index: 'Delete Index',
                    },
                    check_constraint_actions: {
                        title: 'Check Constraint',
                        expression: 'Expression',
                        delete: 'Delete Check Constraint',
                    },
                    table_actions: {
                        title: 'Table Actions',
                        change_schema: 'Change Schema',
                        add_field: 'Add Field',
                        add_index: 'Add Index',
                        duplicate_table: 'Duplicate Table',
                        delete_table: 'Delete Table',
                    },
                },
                empty_state: {
                    title: 'No tables',
                    description: 'Create a table to get started',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'Filter',
                collapse: 'Collapse All',
                add_relationship: 'Add Relationship',
                relationships: 'Relationships',
                dependencies: 'Dependencies',
                relationship: {
                    relationship: 'Relationship',
                    primary: 'Primary Table',
                    foreign: 'Related Table',
                    cardinality: 'Cardinality',
                    delete_relationship: 'Delete',
                    switch_tables: 'Switch Tables',
                    relationship_actions: {
                        title: 'Actions',
                        delete_relationship: 'Delete',
                    },
                },
                dependency: {
                    dependency: 'Dependency',
                    table: 'Table',
                    dependent_table: 'Dependent View',
                    delete_dependency: 'Delete',
                    dependency_actions: {
                        title: 'Actions',
                        delete_dependency: 'Delete',
                    },
                },
                empty_state: {
                    title: 'No relationships',
                    description: 'Create a relationship to get started',
                },
            },

            areas_section: {
                areas: 'Areas',
                add_area: 'Add Area',
                filter: 'Filter',
                clear: 'Clear Filter',
                no_results: 'No areas found matching your filter.',

                area: {
                    area_actions: {
                        title: 'Area Actions',
                        edit_name: 'Edit Name',
                        delete_area: 'Delete Area',
                    },
                },
                empty_state: {
                    title: 'No areas',
                    description: 'Create an area to get started',
                },
            },

            visuals_section: {
                visuals: 'Visuals',
                tabs: {
                    areas: 'Areas',
                    notes: 'Notes',
                },
            },

            notes_section: {
                filter: 'Filter',
                add_note: 'Add Note',
                no_results: 'No notes found',
                clear: 'Clear Filter',
                empty_state: {
                    title: 'No Notes',
                    description:
                        'Create a note to add text annotations on the canvas',
                },
                note: {
                    empty_note: 'Empty note',
                    note_actions: {
                        title: 'Note Actions',
                        edit_content: 'Edit Content',
                        delete_note: 'Delete Note',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'Custom Types',
                filter: 'Filter',
                clear: 'Clear Filter',
                no_results: 'No custom types found matching your filter.',
                new_type: 'New Type',
                empty_state: {
                    title: 'No custom types',
                    description:
                        'Custom types will appear here when they are available in your database',
                },
                custom_type: {
                    kind: 'Kind',
                    enum_values: 'Enum Values',
                    composite_fields: 'Fields',
                    no_fields: 'No fields defined',
                    no_values: 'No enum values defined',
                    field_name_placeholder: 'Field name',
                    field_type_placeholder: 'Select type',
                    add_field: 'Add Field',
                    no_fields_tooltip: 'No fields defined for this custom type',
                    custom_type_actions: {
                        title: 'Actions',
                        highlight_fields: 'Highlight Fields',
                        clear_field_highlight: 'Clear Highlight',
                        delete_custom_type: 'Delete',
                    },
                    delete_custom_type: 'Delete Type',
                },
            },
        },

        toolbar: {
            zoom_in: 'Zoom In',
            zoom_out: 'Zoom Out',
            save: 'Save',
            show_all: 'Show All',
            undo: 'Undo',
            redo: 'Redo',
            reorder_diagram: 'Auto Arrange Diagram',
            highlight_overlapping_tables: 'Highlight Overlapping Tables',
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            filter: 'Filter Tables',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'What is your Database?',
                description:
                    'Each database has its own unique features and capabilities.',
                check_examples_long: 'Check Examples',
                check_examples_short: 'Examples',
            },

            import_database: {
                title: 'Import your Database',
                database_edition: 'Database Edition:',
                step_1: 'Run this script in your database:',
                step_2: 'Paste the script result into this modal →',
                script_results_placeholder: 'Script results here...',
                ssms_instructions: {
                    button_text: 'SSMS Instructions',
                    title: 'Instructions',
                    step_1: 'Go to Tools > Options > Query Results > SQL Server.',
                    step_2: 'If you\'re using "Results to Grid," change the Maximum Characters Retrieved for Non-XML data (set to 9999999).',
                },
                instructions_link: 'Need help? Watch how',
                check_script_result: 'Check Script Result',
            },

            cancel: 'Cancel',
            import_from_file: 'Import from File',
            back: 'Back',
            empty_diagram: 'Empty database',
            continue: 'Continue',
            import: 'Import',
        },

        open_diagram_dialog: {
            title: 'Open Database',
            description: 'Select a diagram to open from the list below.',
            table_columns: {
                name: 'Name',
                created_at: 'Created at',
                last_modified: 'Last modified',
                tables_count: 'Tables',
            },
            cancel: 'Cancel',
            open: 'Open',
            new_database: 'New Database',

            diagram_actions: {
                open: 'Open',
                duplicate: 'Duplicate',
                delete: 'Delete',
            },
        },

        export_sql_dialog: {
            title: 'Export SQL',
            description:
                'Export your diagram schema to {{databaseType}} script',
            close: 'Close',
            loading: {
                text: 'AI is generating SQL for {{databaseType}}...',
                description: 'This should take up to 30 seconds.',
            },
            error: {
                message:
                    'Error generating SQL script. Please try again later or <0>contact us</0>.',
                description:
                    'Feel free to use your OPENAI_TOKEN, see the manual <0>here</0>.',
            },
        },

        create_relationship_dialog: {
            title: 'Create Relationship',
            primary_table: 'Primary Table',
            primary_field: 'Primary Field',
            referenced_table: 'Referenced Table',
            referenced_field: 'Referenced Field',
            primary_table_placeholder: 'Select table',
            primary_field_placeholder: 'Select field',
            referenced_table_placeholder: 'Select table',
            referenced_field_placeholder: 'Select field',
            no_tables_found: 'No tables found',
            no_fields_found: 'No fields found',
            create: 'Create',
            cancel: 'Cancel',
        },

        import_database_dialog: {
            title: 'Import to Current Diagram',
            override_alert: {
                title: 'Import Database',
                content: {
                    alert: 'Importing this diagram will affect existing tables and relationships.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> new tables will be added.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> new relationships will be created.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> tables will be overwritten.',
                    proceed: 'Do you want to proceed?',
                },
                import: 'Import',
                cancel: 'Cancel',
            },
        },

        export_image_dialog: {
            title: 'Export Image',
            description: 'Choose the scale factor for export:',
            scale_1x: '1x (Low Quality)',
            scale_2x: '2x (Normal Quality)',
            scale_4x: '4x (Best Quality)',
            cancel: 'Cancel',
            export: 'Export',
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'Select Schema',
            description:
                'Multiple schemas are currently displayed. Select one for the new table.',
            cancel: 'Cancel',
            confirm: 'Confirm',
        },

        update_table_schema_dialog: {
            title: 'Change Schema',
            description: 'Update table "{{tableName}}" schema',
            cancel: 'Cancel',
            confirm: 'Change',
        },

        create_table_schema_dialog: {
            title: 'Create New Schema',
            description:
                'No schemas exist yet. Create your first schema to organize your tables.',
            create: 'Create',
            cancel: 'Cancel',
        },

        star_us_dialog: {
            title: 'Help us improve!',
            description:
                "Would you like to star us on GitHub? It's just a click away!",
            close: 'Not now',
            confirm: 'Of course!',
        },
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

        import_diagram_dialog: {
            title: 'Import Diagram',
            description: 'Import a diagram from a JSON file.',
            cancel: 'Cancel',
            import: 'Import',
            error: {
                title: 'Error importing diagram',
                description:
                    'The diagram JSON is invalid. Please check the JSON and try again. Need help? support@chartdb.io',
            },
        },

        import_dbml_dialog: {
            example_title: 'Import Example DBML',
            title: 'Import DBML',
            description: 'Import a database schema from DBML format.',
            import: 'Import',
            cancel: 'Cancel',
            skip_and_empty: 'Skip & Empty',
            show_example: 'Show Example',
            error: {
                title: 'Error importing DBML',
                description: 'Failed to parse DBML. Please check the syntax.',
            },
        },
        relationship_type: {
            one_to_one: 'One to One',
            one_to_many: 'One to Many',
            many_to_one: 'Many to One',
            many_to_many: 'Many to Many',
        },

        canvas_context_menu: {
            new_table: 'New Table',
            new_view: 'New View',
            new_relationship: 'New Relationship',
            new_area: 'New Area',
            new_note: 'New Note',
        },

        table_node_context_menu: {
            edit_table: 'Edit Table',
            duplicate_table: 'Duplicate Table',
            delete_table: 'Delete Table',
            add_relationship: 'Add Relationship',
        },

        canvas: {
            all_tables_hidden: 'All tables are hidden',
            show_all_tables: 'Show all',
        },

        canvas_filter: {
            title: 'Filter Tables',
            search_placeholder: 'Search tables...',
            group_by_schema: 'Group by Schema',
            group_by_area: 'Group by Area',
            no_tables_found: 'No tables found',
            empty_diagram_description: 'Create a table to get started',
            no_tables_description: 'Try adjusting your search or filter',
            clear_filter: 'Clear filter',
        },

        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        tool_tips: {
            double_click_to_edit: 'Double-click to edit',
        },

        language_select: {
            change_language: 'Language',
        },

        on: 'On',
        off: 'Off',
    },
};

export const enMetadata: LanguageMetadata = {
    name: 'English',
    nativeName: 'English',
    code: 'en',
};
