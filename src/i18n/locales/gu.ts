import type { LanguageMetadata, LanguageTranslation } from '../types';

export const gu: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'નવું',
            browse: 'ખોલો',
            tables: 'ટેબલો',
            refs: 'રેફ્સ',
            dependencies: 'નિર્ભરતાઓ',
            custom_types: 'કસ્ટમ ટાઇપ',
            visuals: 'Visuals',
        },
        menu: {
            actions: {
                actions: 'ક્રિયાઓ',
                new: 'નવું...',
                browse: 'બધા ડેટાબેસ...',
                save: 'સાચવો',
                import: 'ડેટાબેસ આયાત કરો',
                export_sql: 'SQL નિકાસ કરો',
                export_as: 'રૂપે નિકાસ કરો',
                delete_diagram: 'કાઢી નાખો',
            },
            edit: {
                edit: 'ફેરફાર',
                undo: 'અનડુ',
                redo: 'રીડુ',
                clear: 'સાફ કરો',
            },
            view: {
                view: 'જુઓ',
                show_sidebar: 'સાઇડબાર બતાવો',
                hide_sidebar: 'સાઇડબાર છુપાવો',
                hide_cardinality: 'કાર્ડિનાલિટી છુપાવો',
                show_cardinality: 'કાર્ડિનાલિટી બતાવો',
                hide_field_attributes: 'ફીલ્ડ અટ્રિબ્યુટ્સ છુપાવો',
                show_field_attributes: 'ફીલ્ડ અટ્રિબ્યુટ્સ બતાવો',
                zoom_on_scroll: 'સ્ક્રોલ પર ઝૂમ કરો',
                show_views: 'ડેટાબેઝ વ્યૂઝ',
                theme: 'થિમ',
                show_dependencies: 'નિર્ભરતાઓ બતાવો',
                hide_dependencies: 'નિર્ભરતાઓ છુપાવો',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },

            backup: {
                backup: 'બેકઅપ',
                export_diagram: 'ડાયાગ્રામ નિકાસ કરો',
                restore_diagram: 'ડાયાગ્રામ પુનઃસ્થાપિત કરો',
            },
            help: {
                help: 'મદદ',
                docs_website: 'દસ્તાવેજીકરણ',
                join_discord: 'અમારા Discordમાં જોડાઓ',
            },
        },

        profile_dialog: {
            title: 'પ્રોફાઇલ',
            description: 'તમારી એકાઉન્ટ સેટિંગ્સ જુઓ અને અપડેટ કરો.',
            fields: {
                email: 'ઇમેઇલ',
                nickname: 'ઉપનામ',
                joined: 'જોડાયા',
                profile_image: 'પ્રોફાઇલ ઇમેજ',
                current_password: 'વર્તમાન પાસવર્ડ',
                new_password: 'નવો પાસવર્ડ',
                confirm_new_password: 'નવા પાસવર્ડની પુષ્ટિ કરો',
            },
            hints: {
                profile_image: 'માત્ર છબી ફાઇલો, 5MB સુધી.',
            },
            actions: {
                logout: 'લોગ આઉટ કરો',
                logging_out: 'સાઇન આઉટ કરી રહ્યાં છીએ...',
                cancel: 'રદ કરો',
                save_changes: 'ફેરફારો સાચવો',
                saving: 'સાચવી રહ્યું છે...',
            },
            errors: {
                image_type: 'માત્ર ઇમેજ ફાઇલોને જ મંજૂરી છે.',
                image_size: 'પ્રોફાઇલ ઇમેજ 5MB અથવા નાની હોવી આવશ્યક છે.',
                nickname_required: 'ઉપનામ જરૂરી છે.',
                current_password_required: 'વર્તમાન પાસવર્ડ જરૂરી છે.',
                new_password_required: 'નવો પાસવર્ડ જરૂરી છે.',
                new_password_length:
                    'નવો પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરનો હોવો જોઈએ.',
                password_confirmation_mismatch:
                    'નવા પાસવર્ડની પુષ્ટિ મેળ ખાતી નથી.',
                update_failed: 'પ્રોફાઇલ અપડેટ કરવામાં નિષ્ફળ.',
                signout_failed: 'સાઇન આઉટ કરવામાં નિષ્ફળ.',
            },
            toasts: {
                password_update_failed: {
                    title: 'પાસવર્ડ અપડેટ નિષ્ફળ',
                    description_with_error:
                        'પ્રોફાઇલ ફેરફારો સાચવવામાં આવ્યા હતા. {{error}}',
                    description_without_error:
                        'પ્રોફાઇલ ફેરફારો સાચવવામાં આવ્યા હતા, પરંતુ પાસવર્ડ અપડેટ નિષ્ફળ ગયો.',
                },
                avatar_upload_failed: {
                    title: 'અવતાર અપલોડ નિષ્ફળ થયું',
                    description_fallback:
                        'ઉપનામ અને પાસવર્ડ ફેરફારો હજુ પણ લાગુ કરવામાં આવ્યા હતા.',
                },
                profile_updated: {
                    title: 'પ્રોફાઇલ અપડેટ કરી',
                    description: 'તમારા પ્રોફાઇલ ફેરફારો સાચવવામાં આવ્યા છે.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'આકૃતિ શેર કર��',
        },

        share_dialog: {
            title: 'આકૃતિ શેર કર��',
            description: 'સહયોગીઓને સંપાદકો અથવા દર્શકો તરીકે આમંત્રિત કરો.',
            access: {
                title: 'તમારી ઍક્સેસ',
                readonly_hint:
                    'ફક્ત માલિક જ સભ્યો અને આમંત્રણોનું સંચાલન કરી શકે છે.',
            },
            roles: {
                owner: 'માલિક',
                editor: 'સંપાદક',
                viewer: 'દર્શક',
            },
            status: {
                pending: 'બાકી',
                accepted: 'સ્વીકાર્યું',
                revoked: 'રદબાતલ',
                expired: 'સમાપ્ત',
            },
            invite: {
                section_title: 'ઇમેઇલ દ્વારા આમંત્રણ આપો',
                email_placeholder: 'teammate@example.com',
            },
            members: {
                section_title: 'સભ્યો',
                empty: 'હજુ સુધી કોઈ આમંત્રિત સભ્યો નથી.',
            },
            invitations: {
                section_title: 'બાકી આમંત્રણો',
                empty: 'કોઈ બાકી આમંત્રણ નથી.',
            },
            history: {
                section_title: 'આમંત્રણ ઇતિહાસ',
                empty: 'હજુ સુધી કોઈ આમંત્રણ નથી.',
            },
            actions: {
                invite: 'આમંત્રણ આપો',
                remove: 'દૂર કરો',
                revoke: 'રદબાતલ ક��ો',
                copy_link: 'લિંક કૉપિ કરો',
                refresh: 'તાજું કરો',
                close: 'બંધ',
            },
            labels: {
                your_access: 'તમારી ઍક્સેસ:',
                expires: 'સમાપ્ત થાય છે',
                updated: 'અપડેટ કરેલ',
            },
            toasts: {
                invite_created: {
                    title: 'આમંત્રણ બનાવ્યું',
                    description:
                        '{{email}} ને {{role}} તરીકે આમંત્રિત કરવામાં આવ્યા હતા.',
                },
                invite_failed: {
                    title: 'આમંત્રણ નિષ્ફળ થયું',
                },
                role_update_failed: {
                    title: 'ભૂમિકા અપડેટ નિષ્ફળ',
                },
                remove_failed: {
                    title: 'સભ્યને દૂર કરવાનું નિષ્ફળ થયું',
                },
                revoke_failed: {
                    title: 'આમંત્રણ રદબાતલ કરવાનું નિષ્ફળ થયું',
                },
                copy_success: {
                    title: 'આમંત્રિત લિંક કોપી કરી',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'નકલ નિષ્ફળ',
                    description: 'આમંત્રણ લિંક કૉપિ કરી શકાઈ નથી.',
                },
            },
            errors: {
                email_required: 'ઇમેઇલ આવશ્યક છે.',
                unknown_error: 'અજાણી ભૂલ.',
                no_diagram_selected: 'કોઈ આકૃતિ પસંદ કરેલ નથી.',
            },
        },

        auth_gate: {
            title: 'ERDS માં સાઇન ઇન કરો',
            subtitle: 'તમારા આકૃતિઓ તમારા Supabase ખાતામાં ���ંગ્રહિત છે.',
            tabs: {
                sign_in: 'સાઇન ઇન કરો',
                sign_up: 'સાઇન અપ કરો',
            },
            placeholders: {
                nickname: 'ઉપનામ',
                email: 'you@example.com',
                password: 'પાસવર્ડ',
                confirm_password: 'પાસવર્ડ કન્ફર્મ કરો',
            },
            actions: {
                sign_in: 'સાઇન ઇન કરો',
                signing_in: 'સાઇન ઇન કરી રહ્યાં છીએ...',
                create_account: 'એકાઉન્ટ બનાવો',
                creating_account: 'એકાઉન્ટ બનાવી રહ્યું છે...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase ગોઠવેલ નથી',
                supabase_not_configured_description:
                    'ચાલુ રાખવા માટે SUPABASE_URL અને SUPABASE_PUBLISHABLE_DEFAULT_KEY પર્યાવરણ ચલો ઉમેરો.',
                success_title: 'સફળતા',
                authentication_failed_title: 'પ્રમાણીકરણ નિષ્ફળ થયું',
            },
            validation: {
                email_and_password_required: 'ઈમેલ અને પાસવર્ડ જરૂરી છે.',
                nickname_required: 'ઉપનામ જરૂરી છે.',
                email_required: 'ઇમેઇલ આવશ્યક છે.',
                password_required: 'પાસવર્ડ જરૂરી છે.',
                password_min_length: 'પાસવર્ડ ઓછામાં ઓછો 6 અક્ષરનો હોવો જોઈએ.',
                password_confirmation_mismatch:
                    'પાસવર્ડ કન્ફર્મેશન મેળ ખાતું નથી.',
                sign_in_failed: 'સાઇન ઇન કરવામાં નિષ્ફળ.',
                create_account_failed: 'એકાઉન્ટ બનાવવામાં નિષ્ફળ.',
            },
            success: {
                account_created:
                    'એકાઉન્ટ બનાવ્યું. જો ઈમેલ કન્ફર્મેશન સક્ષમ કરેલ હોય, તો સાઇન ઇન કરતા પહેલા તમારું ઇનબોક્સ તપાસો.',
            },
        },

        invite_accept_page: {
            loading: 'આમંત્રણ સ્વીકારી રહ્યાં છીએ...',
            error_title: 'આમંત્રણ સ્વીકારી શકાયું નથી',
            actions: {
                retry: 'ફરી પ્રયાસ કરો',
                go_to_app: 'એપ્લિકેશન પર જાઓ',
            },
            errors: {
                expired: 'આ આમંત્રણ લિંકની સમયસીમા સમાપ્ત થઈ ગઈ છે.',
                mismatch:
                    'આ આમંત્રણ એક અલગ ઈમેલ એકાઉન્ટ પર મોકલવામાં આવ્યું હતું.',
                revoked: 'આ આમંત્રણ રદ કરવામાં આવ્યું છે.',
                not_pending: 'આ આમંત્રણ હવે સક્રિય નથી.',
                not_found: 'આમંત્રણ મળ્યું નથી.',
                token_missing: 'આમંત્રણ ટોકન ખૂટે છે.',
                supabase_not_configured: 'Supabase ગોઠવેલ નથી.',
                accept_failed: 'આમંત્રણ સ્વીકારવામાં નિષ્ફળ.',
                unknown_error: 'અજાણી ભૂલ.',
                no_diagram_returned:
                    'આમંત્રણ સ્વીકાર્યું, પરંતુ કોઈ આકૃતિ પરત કરવામાં આવી ન હતી.',
                invitee_email_required: 'આમંત્રિત ઇમેઇલ આવશ્યક છે.',
            },
        },

        collab_presence: {
            online_count: '{{count}} ઑનલાઇન',
            role: {
                owner: 'માલિક',
                editor: 'સંપાદક',
                viewer: 'દર્શક',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'મેઘ સમન્વયન પુનઃસ્થાપિત',
            restored_description:
                'ફેરફારો ફરીથી Supabase માં સમન્વયિત થઈ રહ્યા છે.',
            paused_title: 'મેઘ સમન્વયન થોભાવ્યું',
            paused_description:
                'તમારા સ્થાનિક ફેરફારો સુરક્ષિત છે અને આપમેળે ફરી પ્રયાસ કરવામાં આવશે.',
            read_only_title: 'ફક્ત વાંચવા માટેની ઍક્સેસ',
            read_only_description:
                'તમે આ વહેંચાયેલ ડાયાગ્રામ જોઈ શકો છો પણ ફેરફારો સાચવી શકતા નથી.',
            access_removed_title: 'ઍક્સેસ દૂર કરવામાં આવી',
            access_removed_description:
                'આ વહેંચાયેલ ડાયાગ્રામની તમારી ઍક્સેસ દૂર કરવામાં આવી હતી.',
        },

        collaboration_errors: {
            expired: 'આ આમંત્રણ લિંકની સમયસીમા સમાપ્ત થઈ ગઈ છે.',
            mismatch: 'આ આમંત્રણ એક અલગ ઈમેલ એકાઉન્ટ પર મોકલવામાં આવ્યું હતું.',
            revoked: 'આ આમંત્રણ રદ કરવામાં આવ્યું છે.',
            not_pending: 'આ આમંત્રણ હવે સક્રિય નથી.',
            not_found: 'આમંત્રણ મળ્યું નથી.',
            invitee_email_required: 'આમંત્રિત ઇમેઇલ આવશ્યક છે.',
            token_missing: 'આમંત્રણ ટોકન જરૂરી છે.',
            supabase_not_configured: 'Supabase ગોઠવેલ નથી.',
        },

        delete_diagram_alert: {
            title: 'ડાયાગ્રામ કાઢી નાખો',
            description:
                'આ ક્રિયા પરત નહીં લઇ શકાય. આ ડાયાગ્રામ કાયમ માટે કાઢી નાખવામાં આવશે.',
            cancel: 'રદ કરો',
            delete: 'કાઢી નાખો',
        },

        clear_diagram_alert: {
            title: 'ડાયાગ્રામ સાફ કરો',
            description:
                'આ ક્રિયા પરત નહીં લઇ શકાય. આ ડાયાગ્રામમાં બધા ડેટા કાયમ માટે કાઢી નાખશે.',
            cancel: 'રદ કરો',
            clear: 'સાફ કરો',
        },

        reorder_diagram_alert: {
            title: 'ડાયાગ્રામ ઑટોમેટિક ગોઠવો',
            description:
                'આ ક્રિયા ડાયાગ્રામમાં બધી ટેબલ્સને ફરીથી વ્યવસ્થિત કરશે. શું તમે ચાલુ રાખવા માંગો છો?',
            reorder: 'ઑટોમેટિક ગોઠવો',
            cancel: 'રદ કરો',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'નકલ નિષ્ફળ',
                description: 'ક્લિપબોર્ડ આધારિત નથી',
            },
            failed: {
                title: 'નકલ નિષ્ફળ',
                description: 'કંઈક ખોટું થયું છે. કૃપા કરીને ફરી પ્રયાસ કરો.',
            },
        },

        theme: {
            system: 'સિસ્ટમ',
            light: 'હલકો',
            dark: 'ઘાટો',
        },

        zoom: {
            on: 'ચાલુ',
            off: 'બંધ',
        },

        last_saved: 'છેલ્લે સાચવ્યું',
        saved: 'સાચવ્યું',
        loading_diagram: 'ડાયાગ્રામ લોડ થઈ રહ્યું છે...',
        deselect_all: 'બધાને ડીસેલેક્ટ કરો',
        select_all: 'બધા પસંદ કરો',
        clear: 'સાફ કરો',
        show_more: 'વધુ બતાવો',
        show_less: 'ઓછું બતાવો',
        copy_to_clipboard: 'ક્લિપબોર્ડમાં નકલ કરો',
        copied: 'નકલ થયું!',

        side_panel: {
            view_all_options: 'બધા વિકલ્પો જુઓ...',
            tables_section: {
                tables: 'ટેબલ્સ',
                add_table: 'ટેબલ ઉમેરો',
                add_view: 'વ્યૂ ઉમેરો',
                filter: 'ફિલ્ટર',
                collapse: 'બધાને સકુચિત કરો',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'બધી ટેબલ્સ છુપાયેલી છે',
                show_all: 'બધું બતાવો',

                table: {
                    fields: 'ફીલ્ડ્સ',
                    //TODO translate
                    nullable: 'Nullable?',
                    primary_key: 'પ્રાથમિક કી',
                    indexes: 'ઈન્ડેક્સ',
                    check_constraints: 'ચકાસણી નિયંત્રણો',
                    comments: 'ટિપ્પણીઓ',
                    no_comments: 'કોઈ ટિપ્પણીઓ નથી',
                    add_field: 'ફીલ્ડ ઉમેરો',
                    add_index: 'ઈન્ડેક્સ ઉમેરો',
                    add_check: 'ચકાસણી ઉમેરો',
                    index_select_fields: 'ફીલ્ડ્સ પસંદ કરો',
                    no_types_found: 'કોઈ પ્રકાર મળ્યા નથી',
                    field_name: 'નામ',
                    field_type: 'પ્રકાર',
                    field_actions: {
                        title: 'ફીલ્ડ લક્ષણો',
                        unique: 'અદ્વિતીય',
                        auto_increment: 'ઑટો ઇન્ક્રિમેન્ટ',
                        comments: 'ટિપ્પણીઓ',
                        no_comments: 'કોઈ ટિપ્પણીઓ નથી',
                        delete_field: 'ફીલ્ડ કાઢી નાખો',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'ચોકસાઈ',
                        scale: 'માપ',
                    },
                    index_actions: {
                        title: 'ઇન્ડેક્સ લક્ષણો',
                        name: 'નામ',
                        unique: 'અદ્વિતીય',
                        index_type: 'ઇન્ડેક્સ પ્રકાર',
                        delete_index: 'ઇન્ડેક્સ કાઢી નાખો',
                    },
                    check_constraint_actions: {
                        title: 'ચકાસણી નિયંત્રણ',
                        expression: 'અભિવ્યક્તિ',
                        delete: 'નિયંત્રણ કાઢી નાખો',
                    },
                    table_actions: {
                        title: 'ટેબલ ક્રિયાઓ',
                        change_schema: 'સ્કીમા બદલો',
                        add_field: 'ફીલ્ડ ઉમેરો',
                        add_index: 'ઇન્ડેક્સ ઉમેરો',
                        duplicate_table: 'ટેબલ ડુપ્લિકેટ કરો',
                        delete_table: 'ટેબલ કાઢી નાખો',
                    },
                },
                empty_state: {
                    title: 'કોઈ ટેબલ્સ નથી',
                    description: 'શરૂ કરવા માટે એક ટેબલ બનાવો',
                },
            },
            refs_section: {
                refs: 'રેફ્સ',
                filter: 'ફિલ્ટર',
                collapse: 'બધાને સકુચિત કરો',
                add_relationship: 'સંબંધ ઉમેરો',
                relationships: 'સંબંધો',
                dependencies: 'નિર્ભરતાઓ',
                relationship: {
                    relationship: 'સંબંધ',
                    primary: 'પ્રાથમિક ટેબલ',
                    foreign: 'સંબંધિત ટેબલ',
                    cardinality: 'કાર્ડિનાલિટી',
                    delete_relationship: 'કાઢી નાખો',
                    switch_tables: 'ટેબલ બદલો',
                    relationship_actions: {
                        title: 'ક્રિયાઓ',
                        delete_relationship: 'કાઢી નાખો',
                    },
                },
                dependency: {
                    dependency: 'નિર્ભરતા',
                    table: 'ટેબલ',
                    dependent_table: 'નિર્ભરશીલ વ્યૂ',
                    delete_dependency: 'કાઢી નાખો',
                    dependency_actions: {
                        title: 'ક્રિયાઓ',
                        delete_dependency: 'કાઢી નાખો',
                    },
                },
                empty_state: {
                    title: 'કોઈ સંબંધો નથી',
                    description: 'શરૂ કરવા માટે એક સંબંધ બનાવો',
                },
            },

            areas_section: {
                areas: 'વિસ્તારો',
                add_area: 'વિસ્તાર ઉમેરો',
                filter: 'ફિલ્ટર',
                clear: 'ફિલ્ટર સાફ કરો',
                no_results: 'તમારા ફિલ્ટરને અનુરૂપ કોઈ વિસ્તાર મળ્યો નથી.',

                area: {
                    area_actions: {
                        title: 'વિસ્તાર ક્રિયાઓ',
                        edit_name: 'નામ સંપાદિત કરો',
                        delete_area: 'વિસ્તાર કાઢી નાખો',
                    },
                },
                empty_state: {
                    title: 'કોઈ વિસ્તાર નથી',
                    description: 'શરૂ કરવા માટે વિસ્તાર બનાવો',
                },
            },

            visuals_section: {
                visuals: 'Visuals',
                tabs: {
                    areas: 'વિસ્તારો',
                    notes: 'નોંધો',
                },
            },

            notes_section: {
                filter: 'ફિલ્ટર',
                add_note: 'નોંધ ઉમેરો',
                no_results: 'કોઈ નોંધો મળી નથી',
                clear: 'ફિલ્ટર સાફ કરો',
                empty_state: {
                    title: 'કોઈ નોંધો નથી',
                    description:
                        'કેનવાસ પર ટેક્સ્ટ એનોટેશન ઉમેરવા માટે નોંધ બનાવો',
                },
                note: {
                    empty_note: 'ખાલી નોંધ',
                    note_actions: {
                        title: 'નોંધ ક્રિયાઓ',
                        edit_content: 'સામગ્રી સંપાદિત કરો',
                        delete_note: 'નોંધ કાઢી નાખો',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'કસ્ટમ પ્રકાર',
                filter: 'ફિલ્ટર',
                clear: 'ફિલ્ટર સાફ કરો',
                no_results: 'તમારા ફિલ્ટરને અનુરૂપ કોઈ કસ્ટમ પ્રકાર મળ્યો નથી.',
                new_type: 'નવો પ્રકાર',
                empty_state: {
                    title: 'કોઈ કસ્ટમ પ્રકાર નથી',
                    description:
                        'જ્યારે તમારા ડેટાબેસમાં ઉપલબ્ધ હશે ત્યારે કસ્ટમ પ્રકાર અહીં દેખાશે',
                },
                custom_type: {
                    kind: 'પ્રકાર',
                    enum_values: 'Enum મૂલ્યો',
                    composite_fields: 'ફીલ્ડ્સ',
                    no_fields: 'કોઈ ફીલ્ડ વ્યાખ્યાયિત નથી',
                    no_values: 'કોઈ enum મૂલ્યો વ્યાખ્યાયિત નથી',
                    field_name_placeholder: 'ફીલ્ડનું નામ',
                    field_type_placeholder: 'પ્રકાર પસંદ કરો',
                    add_field: 'ફીલ્ડ ઉમેરો',
                    no_fields_tooltip:
                        'આ કસ્ટમ પ્રકાર માટે કોઈ ફીલ્ડ વ્યાખ્યાયિત નથી',
                    custom_type_actions: {
                        title: 'ક્રિયાઓ',
                        highlight_fields: 'ફીલ્ડ્સ હાઇલાઇટ કરો',
                        delete_custom_type: 'કાઢી નાખો',
                        clear_field_highlight: 'હાઇલાઇટ કાઢો',
                    },
                    delete_custom_type: 'પ્રકાર કાઢી નાખો',
                },
            },
        },

        toolbar: {
            zoom_in: 'ઝૂમ ઇન',
            zoom_out: 'ઝૂમ આઉટ',
            save: 'સાચવો',
            show_all: 'બધું બતાવો',
            undo: 'અનડુ',
            redo: 'રીડુ',
            reorder_diagram: 'ડાયાગ્રામ ઑટોમેટિક ગોઠવો',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'ઓવરલેપ કરતો ટેબલ હાઇલાઇટ કરો',
            filter: 'ટેબલ ફિલ્ટર કરો',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'તમારું ડેટાબેસ શું છે?',
                description: 'દરેક ડેટાબેસની પોતાની ખાસિયતો અને ક્ષમતા હોય છે.',
                check_examples_long: 'ઉદાહરણ જુઓ',
                check_examples_short: 'ઉદાહરણ',
            },

            import_database: {
                title: 'તમારું ડેટાબેસ આયાત કરો',
                database_edition: 'ડેટાબેસ આવૃત્તિ:',
                step_1: 'તમારા ડેટાબેસમાં આ સ્ક્રિપ્ટ ચલાવો:',
                step_2: 'સ્ક્રિપ્ટનો પરિણામ અહીં પેસ્ટ કરો →',
                script_results_placeholder: 'સ્ક્રિપ્ટના પરિણામ અહીં...',
                ssms_instructions: {
                    button_text: 'SSMS સૂચનાઓ',
                    title: 'સૂચનાઓ',
                    step_1: 'ટૂલ્સ > વિકલ્પો > ક્વેરી પરિણામો > SQL સર્વર પર જાઓ.',
                    step_2: 'જો તમે "ગ્રિડમાં પરિણામો" નો ઉપયોગ કરી રહ્યા છો, તો નોન-XML ડેટા માટે મહત્તમ અક્ષરો મેળવવું (9999999 પર સેટ કરો).',
                },
                instructions_link: 'મદદ જોઈએ? અહીં જુઓ',
                check_script_result: 'સ્ક્રિપ્ટ પરિણામ તપાસો',
            },

            cancel: 'રદ કરો',
            back: 'પાછા',
            import_from_file: 'ફાઇલમાંથી આયાત કરો',
            empty_diagram: 'ખાલી ડેટાબેસ',
            continue: 'ચાલુ રાખો',
            import: 'આયાત કરો',
        },

        open_diagram_dialog: {
            title: 'ડેટાબેસ ખોલો',
            description: 'નીચેની યાદીમાંથી એક ડાયાગ્રામ પસંદ કરો.',
            table_columns: {
                name: 'નામ',
                created_at: 'બનાવાની તારીખ',
                last_modified: 'છેલ્લું સુધારેલું',
                tables_count: 'ટેબલ્સ',
            },
            cancel: 'રદ કરો',
            open: 'ખોલો',
            new_database: 'નવું ડેટાબેસ',

            diagram_actions: {
                open: 'ખોલો',
                duplicate: 'ડુપ્લિકેટ',
                delete: 'કાઢી નાખો',
            },
        },

        export_sql_dialog: {
            title: 'SQL નિકાસ કરો',
            description:
                '{{databaseType}} સ્ક્રિપ્ટ માટે તમારું ડાયાગ્રામ સ્કીમા નિકાસ કરો',
            close: 'બંધ કરો',
            loading: {
                text: '{{databaseType}} માટે AI SQL બનાવી રહ્યું છે...',
                description: 'તેને 30 સેકંડ સુધીનો સમય લાગી શકે છે.',
            },
            error: {
                message:
                    'SQL સ્ક્રિપ્ટ જનરેટ કરવા દરમિયાન ભૂલ થઈ. કૃપા કરીને પછીથી ફરી પ્રયત્ન કરો અથવા <0>અમારો સંપર્ક કરો</0>.',
                description:
                    'તમારા OPENAI_TOKEN નો ઉપયોગ કરવા માટે મફત અનુભવો, મેન્યુઅલ <0>અહીં જુઓ</0>.',
            },
        },

        create_relationship_dialog: {
            title: 'સંબંધ બનાવો',
            primary_table: 'પ્રાથમિક ટેબલ',
            primary_field: 'પ્રાથમિક ફીલ્ડ',
            referenced_table: 'સંદર્ભિત ટેબલ',
            referenced_field: 'સંદર્ભિત ફીલ્ડ',
            primary_table_placeholder: 'ટેબલ પસંદ કરો',
            primary_field_placeholder: 'ફીલ્ડ પસંદ કરો',
            referenced_table_placeholder: 'ટેબલ પસંદ કરો',
            referenced_field_placeholder: 'ફીલ્ડ પસંદ કરો',
            no_tables_found: 'કોઈ ટેબલ મળી નથી',
            no_fields_found: 'કોઈ ફીલ્ડ મળી નથી',
            create: 'બનાવો',
            cancel: 'રદ કરો',
        },

        import_database_dialog: {
            title: 'વર્તમાન ડાયાગ્રામમાં આયાત કરો',
            override_alert: {
                title: 'ડેટાબેસ આયાત કરો',
                content: {
                    alert: 'આ ડાયાગ્રામ આયાત કરવાથી હાલના ટેબલ્સ અને સંબંધો પર અસર થશે.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> નવા ટેબલ ઉમેરવામાં આવશે.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> નવા સંબંધો બનાવવામાં આવશે.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> ટેબલ ઓવરરાઇટ કરાશે.',
                    proceed: 'શું તમે આગળ વધવા માંગો છો?',
                },
                import: 'આયાત કરો',
                cancel: 'રદ કરો',
            },
        },

        export_image_dialog: {
            title: 'છબી નિકાસ કરો',
            description: 'નિકાસ માટે સ્કેલ ફેક્ટર પસંદ કરો:',
            scale_1x: '1x (નીચી ગુણવત્તા)',
            scale_2x: '2x (સામાન્ય ગુણવત્તા)',
            scale_4x: '4x (શ્રેષ્ઠ ગુણવત્તા)',
            cancel: 'રદ કરો',
            export: 'નિકાસ કરો',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'સ્કીમા પસંદ કરો',
            description:
                'વર્તમાનમાં ઘણા સ્કીમા દર્શાવવામાં આવે છે. નવું ટેબલ માટે એક પસંદ કરો.',
            cancel: 'રદ કરો',
            confirm: 'ખાતરી કરો',
        },

        update_table_schema_dialog: {
            title: 'સ્કીમા બદલો',
            description: 'ટેબલ "{{tableName}}" માટે સ્કીમા અપડેટ કરો',
            cancel: 'રદ કરો',
            confirm: 'બદલો',
        },

        create_table_schema_dialog: {
            title: 'નવું સ્કીમા બનાવો',
            description:
                'હજી સુધી કોઈ સ્કીમા અસ્તિત્વમાં નથી. તમારા ટેબલ્સ ને વ્યવસ્થિત કરવા માટે તમારું પહેલું સ્કીમા બનાવો.',
            create: 'બનાવો',
            cancel: 'રદ કરો',
        },

        star_us_dialog: {
            title: 'અમને સુધારવામાં મદદ કરો!',
            description:
                'શું તમે GitHub પર અમને સ્ટાર આપી શકો છો? તે માત્ર એક ક્લિક દૂર છે!',
            close: 'હાલમાં નહીં',
            confirm: 'ખરેખર!',
        },

        export_diagram_dialog: {
            title: 'ડાયાગ્રામ નિકાસ કરો',
            description: 'નિકાસ માટે ફોર્મેટ પસંદ કરો:',
            format_json: 'JSON',
            cancel: 'રદ કરો',
            export: 'નિકાસ કરો',
            error: {
                title: 'ડાયાગ્રામ નિકાસમાં ભૂલ',
                description:
                    'કશુક તો ખોટું થયું. મદદ જોઈએ? support@chartdb.io પર સંપર્ક કરો.',
            },
        },

        import_diagram_dialog: {
            title: 'ડાયાગ્રામ આયાત કરો',
            description: 'નીચે ડાયાગ્રામ JSON પેસ્ટ કરો:',
            cancel: 'રદ કરો',
            import: 'આયાત કરો',
            error: {
                title: 'ડાયાગ્રામ આયાતમાં ભૂલ',
                description:
                    'ડાયાગ્રામ JSON અમાન્ય છે. કૃપા કરીને JSON તપાસો અને ફરી પ્રયાસ કરો. મદદ જોઈએ? support@chartdb.io પર સંપર્ક કરો.',
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
            one_to_one: 'એકથી એક',
            one_to_many: 'એકથી ઘણા',
            many_to_one: 'ઘણા થી એક',
            many_to_many: 'ઘણાથી ઘણા',
        },

        canvas_context_menu: {
            new_table: 'નવું ટેબલ',
            new_view: 'નવું વ્યૂ',
            new_relationship: 'નવો સંબંધ',
            // TODO: Translate
            new_area: 'નવો વિસ્તાર',
            new_note: 'નવી નોંધ',
        },

        table_node_context_menu: {
            edit_table: 'ટેબલ સંપાદિત કરો',
            duplicate_table: 'ટેબલ નકલ કરો',
            delete_table: 'ટેબલ કાઢી નાખો',
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'બધી ટેબલ્સ છુપાયેલી છે',
            show_all_tables: 'બધું બતાવો',
        },

        canvas_filter: {
            title: 'ટેબલ્સ ફિલ્ટર કરો',
            search_placeholder: 'ટેબલ્સ શોધો...',
            group_by_schema: 'સ્કીમા પ્રમાણે ગ્રુપ કરો',
            group_by_area: 'વિસ્તાર પ્રમાણે ગ્રુપ કરો',
            no_tables_found: 'કોઈ ટેબલ મળી નથી',
            empty_diagram_description: 'શરૂ કરવા માટે ટેબલ બનાવો',
            no_tables_description:
                'તમારી શોધ અથવા ફિલ્ટર સમાયોજિત કરવાનો પ્રયાસ કરો',
            clear_filter: 'ફિલ્ટર સાફ કરો',
        },

        snap_to_grid_tooltip: 'ગ્રિડ પર સ્નેપ કરો (જમાવટ {{key}})',

        tool_tips: {
            double_click_to_edit: 'સંપાદિત કરવા માટે ડબલ-ક્લિક કરો',
        },

        language_select: {
            change_language: 'ભાષા બદલો',
        },

        on: 'ચાલુ',
        off: 'બંધ',
    },
};

export const guMetadata: LanguageMetadata = {
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    code: 'gu',
};
