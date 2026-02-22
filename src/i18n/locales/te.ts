import type { LanguageMetadata, LanguageTranslation } from '../types';

export const te: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'కొత్తది',
            browse: 'తెరవు',
            tables: 'టేబల్లు',
            refs: 'సంబంధాలు',
            dependencies: 'ఆధారతలు',
            custom_types: 'కస్టమ్ టైప్స్',
            visuals: 'Visuals',
        },
        menu: {
            actions: {
                actions: 'చర్యలు',
                new: 'కొత్తది...',
                browse: 'అన్ని డేటాబేస్‌లు...',
                save: 'సేవ్',
                import: 'డేటాబేస్‌ను దిగుమతి చేసుకోండి',
                export_sql: 'SQL ఎగుమతి',
                export_as: 'వగా ఎగుమతి చేయండి',
                delete_diagram: 'తొలగించండి',
            },
            edit: {
                edit: 'సవరించు',
                undo: 'తిరిగి చేయు',
                redo: 'మరలా చేయు',
                clear: 'తొలగించు',
            },
            view: {
                view: 'కாணండి',
                show_sidebar: 'సైడ్‌బార్ చూపించు',
                hide_sidebar: 'సైడ్‌బార్ దాచండి',
                hide_cardinality: 'కార్డినాలిటీని దాచండి',
                show_cardinality: 'కార్డినాలిటీని చూపించండి',
                show_field_attributes: 'ఫీల్డ్ గుణాలను చూపించు',
                hide_field_attributes: 'ఫీల్డ్ గుణాలను దాచండి',
                zoom_on_scroll: 'స్క్రోల్‌పై జూమ్',
                show_views: 'డేటాబేస్ వ్యూలు',
                theme: 'థీమ్',
                show_dependencies: 'ఆధారాలు చూపించండి',
                hide_dependencies: 'ఆధారాలను దాచండి',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            // TODO: Translate
            backup: {
                backup: 'Backup',
                export_diagram: 'Export Diagram',
                restore_diagram: 'Restore Diagram',
            },
            help: {
                help: 'సహాయం',
                docs_website: 'డాక్యుమెంటేషన్',
                join_discord: 'డిస్కార్డ్‌లో మా నుంచి చేరండి',
            },
        },

        profile_dialog: {
            title: 'ప్రొఫైల్',
            description: 'మీ ఖాతా సెట్టింగ్‌లను వీక్షించండి మరియు నవీకరించండి.',
            fields: {
                email: 'ఇమెయిల్',
                nickname: 'మారుపేరు',
                joined: 'చేరారు',
                profile_image: 'ప్రొఫైల్ చిత్రం',
                current_password: 'ప్రస్తుత పాస్‌వర్డ్',
                new_password: 'కొత్త పాస్‌వర్డ్',
                confirm_new_password: 'కొత్త పాస్‌వర్డ్‌ను నిర్ధారించండి',
            },
            hints: {
                profile_image: 'చిత్ర ఫైల్‌లు మాత్రమే, గరిష్టంగా 5MB.',
            },
            actions: {
                logout: 'లాగ్ అవుట్ చేయండి',
                logging_out: 'సైన్ అవుట్ చేస్తోంది...',
                cancel: 'రద్దు చేయి',
                save_changes: 'మార్పులను సేవ్ చేయండి',
                saving: 'సేవ్ చేస్తో��ది...',
            },
            errors: {
                image_type: 'ఇమేజ్ ఫైల్‌లు మాత్రమే అనుమతించబడతాయి.',
                image_size:
                    'ప్రొఫైల్ చిత్రం తప్పనిసరిగా 5MB లేదా అంతకంటే చిన్నదిగా ఉండాలి.',
                nickname_required: 'మారుపేరు అవసరం.',
                current_password_required: 'ప్రస్తుత పాస్‌వర్డ్ అవసరం.',
                new_password_required: 'కొత్త పాస్‌వర్డ్ అవసరం.',
                new_password_length:
                    'కొత్త పాస్‌వర్డ్ తప్పనిసరిగా కనీసం 6 అక్షరాలు ఉండాలి.',
                password_confirmation_mismatch:
                    'కొత్త పాస్‌వర్డ్ నిర్ధారణ సరిపోలలేదు.',
                update_failed: 'ప్రొఫైల్‌ను నవీకరించడంలో విఫలమైంది.',
                signout_failed: 'సైన్ అవుట్ చేయడంలో విఫలమైంది.',
            },
            toasts: {
                password_update_failed: {
                    title: 'పాస్‌వర్డ్ నవీకరణ విఫలమైంది',
                    description_with_error:
                        'ప్రొఫైల్ మార్పులు సేవ్ చేయబడ్డాయి. {{error}}',
                    description_without_error:
                        'ప్రొఫైల్ మార్పులు సేవ్ చేయబడ్డాయి, కానీ పాస్‌వర్డ్ నవీకరణ విఫలమైంది.',
                },
                avatar_upload_failed: {
                    title: 'అవతార్ అప్‌లోడ్ విఫలమైంది',
                    description_fallback:
                        'మారుపేరు మరియు పాస్‌వర్డ్ మార్పులు ఇప్పటికీ వర్తింపజేయబడ్డాయి.',
                },
                profile_updated: {
                    title: 'ప్రొఫైల్ నవీకరించబడింది',
                    description: 'మీ ప్రొఫైల్ మా��్పులు సేవ్ చేయబడ్డాయి.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'రేఖాచిత్రాన్ని భాగస్వామ్యం చేయండి',
        },

        share_dialog: {
            title: 'రేఖాచిత్రాన్ని భాగస్వామ్యం చేయండి',
            description: 'సహకారులను సంపాదకులు లేదా వీక్షకులుగా ఆహ్వానించండి.',
            access: {
                title: 'మీ యాక్సెస్',
                readonly_hint:
                    'యజమాని మాత్రమే సభ్యులు మరియు ఆహ్వానాలను నిర్వహించగలరు.',
            },
            roles: {
                owner: 'యజమాని',
                editor: 'ఎడిటర్',
                viewer: 'వీక్షకుడు',
            },
            status: {
                pending: 'పెండింగ్‌లో ఉంది',
                accepted: 'ఆమోదించబడింది',
                revoked: 'రద్దు చేయబడింది',
                expired: 'గడువు ముగిసింది',
            },
            invite: {
                section_title: 'ఇమెయిల్ ద్వారా ఆహ్వానించండి',
                email_placeholder: 'teammate@example.com',
            },
            members: {
                section_title: 'సభ్యులు',
                empty: 'ఇంకా ఆహ్వానించబడిన సభ్యులు లేరు.',
            },
            invitations: {
                section_title: 'పెండింగ్ ఆహ్వానాలు',
                empty: 'పెండింగ్ ఆహ్వానాలు లేవు.',
            },
            history: {
                section_title: 'ఆహ్వాన చరిత్ర',
                empty: 'ఇంకా ఆహ్వానాలు లేవు.',
            },
            actions: {
                invite: 'ఆహ్వానించండి',
                remove: 'తీసివేయండి',
                revoke: 'ఉపసంహరించుకోండి',
                copy_link: 'లింక్‌ని కాపీ చేయండి',
                refresh: 'రిఫ్రెష్ చేయండి',
                close: 'మూసివేయండి',
            },
            labels: {
                your_access: 'మీ యాక్సెస్:',
                expires: 'గడువు ముగుస్తుంది',
                updated: 'నవీకరించబడింది',
            },
            toasts: {
                invite_created: {
                    title: 'ఆహ్వానం సృష్టించబడింది',
                    description: '{{email}} {{role}}గా ఆహ్వానించబడ్డారు.',
                },
                invite_failed: {
                    title: 'ఆహ్వానం విఫలమైంది',
                },
                role_update_failed: {
                    title: 'పాత్ర నవీకరణ విఫలమైంది',
                },
                remove_failed: {
                    title: 'సభ్యుడిని తీసివేయడం విఫలమైంది',
                },
                revoke_failed: {
                    title: 'ఆహ్వానాన్ని రద్దు చేయడం విఫలమైంది',
                },
                copy_success: {
                    title: 'ఆహ్వాన లింక్ కాపీ చేయబడింది',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'కాపీ విఫలమైంది',
                    description: 'ఆహ్వాన లింక్‌ని కాపీ చేయడం సాధ్యపడలేదు.',
                },
            },
            errors: {
                email_required: 'ఇమెయిల్ అవసరం.',
                unknown_error: 'తెలియని లోపం.',
                no_diagram_selected: 'రేఖాచిత్రం ఎంచుకోబడలేదు.',
            },
        },

        auth_gate: {
            title: 'ERDSకి సైన్ ఇన్ చేయండి',
            subtitle: 'మీ రేఖాచిత్రాలు మీ Supabase ఖాతాలో నిల్వ చేయబడ్డాయి.',
            tabs: {
                sign_in: 'సైన్ ఇన్ చేయండి',
                sign_up: 'సైన్ అప్ చేయండి',
            },
            placeholders: {
                nickname: 'మారుపేరు',
                email: 'you@example.com',
                password: 'పాస్‌వర్డ్',
                confirm_password: 'పాస్‌వర్డ్‌ని నిర్ధారించండి',
            },
            actions: {
                sign_in: 'సైన్ ఇన్ చేయండి',
                signing_in: 'సైన్ ఇన్ చేస్తోంది...',
                create_account: 'ఖాతాను సృష్టించండి',
                creating_account: 'ఖాతాను సృష్టిస్తోంది...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase కాన్ఫిగర్ చేయబడలేదు',
                supabase_not_configured_description:
                    'కొనసాగించడానికి SUPABASE_URL మరియు SUPABASE_PUBLISHABLE_DEFAULT_KEY ఎన్విరాన్మెంట్ వేరియబుల్స్ జోడించండి.',
                success_title: 'విజయం',
                authentication_failed_title: 'ప్రామాణీకరణ విఫలమైంది',
            },
            validation: {
                email_and_password_required: 'ఇమెయిల్ మరియు పాస్‌వర్డ్ అవసరం.',
                nickname_required: 'మారుపేరు అవసరం.',
                email_required: 'ఇమెయిల్ అవసరం.',
                password_required: 'పాస్‌వర్డ్ అవసరం.',
                password_min_length:
                    'పాస్‌వర్డ్ తప్పనిసరిగా కనీసం 6 అక్షరాలు ఉండాలి.',
                password_confirmation_mismatch:
                    'పాస్‌వర్డ్ నిర్ధారణ సరిపోలలేదు.',
                sign_in_failed: 'సైన్ ఇన్ చేయడంలో విఫలమైంది.',
                create_account_failed: 'ఖాతాను సృష్టించడం విఫలమైంది.',
            },
            success: {
                account_created:
                    'ఖాతా సృష్టించబడింది. ఇమెయిల్ నిర్ధారణ ప్రారంభించబడితే, సైన్ ఇన్ చేయడానికి ముందు మీ ఇన్‌బాక్స్‌ని తనిఖీ చేయండి.',
            },
        },

        invite_accept_page: {
            loading: 'ఆహ్వా���ాన్ని అంగీకరిస్తోంది...',
            error_title: 'ఆహ్వానం ఆమోదించబడలేదు',
            actions: {
                retry: 'మళ్లీ ప్రయత్నించండి',
                go_to_app: 'యాప్‌కి వెళ్లండి',
            },
            errors: {
                expired: 'ఈ ఆహ్వాన లింక్ గడువు ముగిసింది.',
                mismatch: 'ఈ ఆహ్వానం వేరే ఇమెయిల్ ఖాతాకు పంపబడింది.',
                revoked: 'ఈ ఆహ్వానం ఉపసంహరించబడింది.',
                not_pending: 'ఈ ఆహ్వానం ఇప్పుడు సక్రియంగా లేదు.',
                not_found: 'ఆహ్వానం కనుగొనబడలేదు.',
                token_missing: 'ఆహ్వాన టోకెన్ లేదు.',
                supabase_not_configured: 'Supabase కాన్ఫిగర్ చేయబడలేదు.',
                accept_failed: 'ఆహ్వానాన్ని ఆమోదించడంలో విఫలమైంది.',
                unknown_error: 'తెలియని లోపం.',
                no_diagram_returned:
                    'ఆహ్వానం ఆమోదించబడింది, కానీ రేఖాచి���్రం తిరిగి ఇవ్వబడలేదు.',
                invitee_email_required: 'ఆహ్వానిత ఇమెయిల్ అవసరం.',
            },
        },

        collab_presence: {
            online_count: '{{count}} ఆన్‌లైన్',
            role: {
                owner: 'యజమాని',
                editor: 'ఎడిటర్',
                viewer: 'వీక్షకుడు',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'క్లౌడ్ సమకాలీకరణ పునరుద్ధరించబడింది',
            restored_description:
                'మార్పులు మళ్లీ Supabaseకి సమకాలీకరించబడుతున్నాయి.',
            paused_title: 'క్లౌడ్ సమకాలీకరణ పాజ్ చేయబడింది',
            paused_description:
                'మీ స్థానిక మార్పులు సురక్షితమైనవి మరియు స్వయంచాలకంగా మళ్లీ ప్రయత్నించబడతాయి.',
            read_only_title: 'చదవడానికి మాత్రమే యాక్సెస్',
            read_only_description:
                'మీరు ఈ భాగస్వామ్య రేఖాచిత్రాన్ని చూడవచ్చు కానీ మార్పులను సేవ్ చేయలేరు.',
            access_removed_title: 'యాక్సెస్ తీసివేయబడింది',
            access_removed_description:
                'ఈ భాగస్వామ్య రేఖాచిత్రానికి మీ యాక్సెస్ తీసివేయబడింది.',
        },

        collaboration_errors: {
            expired: 'ఈ ఆహ్వాన లింక్ గడువు ముగిసింది.',
            mismatch: 'ఈ ఆహ్వానం వేరే ఇమెయిల్ ఖాతాకు పంపబడింది.',
            revoked: 'ఈ ఆహ్వానం ఉపసంహరించబడింది.',
            not_pending: 'ఈ ఆహ్వానం ఇప్పుడు సక్రియంగా లేదు.',
            not_found: 'ఆహ్వానం కనుగొనబడలేదు.',
            invitee_email_required: 'ఆహ్వానిత ఇమెయిల్ అవసరం.',
            token_missing: 'ఆహ్వాన టోకెన్ అవసరం.',
            supabase_not_configured: 'Supabase కాన్ఫిగర్ చేయబడలేదు.',
        },

        delete_diagram_alert: {
            title: 'చిత్రం తొలగించండి',
            description:
                'ఈ చర్యను తిరిగి చేయలేరు. ఇది చిత్రాన్ని శాశ్వతంగా తొలగిస్తుంది.',
            cancel: 'రద్దు',
            delete: 'తొలగించు',
        },

        clear_diagram_alert: {
            title: 'చిత్రాన్ని తొలగించు',
            description:
                'ఈ చర్యను తిరిగి చేయలేరు. ఇది చిత్రంలో ఉన్న అన్ని డేటాను శాశ్వతంగా తొలగిస్తుంది.',
            cancel: 'రద్దు',
            clear: 'తొలగించు',
        },

        reorder_diagram_alert: {
            title: 'చిత్రాన్ని స్వయంచాలకంగా అమర్చండి',
            description:
                'ఈ చర్య చిత్రంలోని అన్ని పట్టికలను పునఃస్థాపిస్తుంది. మీరు కొనసాగించాలనుకుంటున్నారా?',
            reorder: 'స్వయంచాలకంగా అమర్చండి',
            cancel: 'రద్దు',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'కాపీ విఫలమైంది',
                description: 'క్లిప్‌బోర్డ్ మద్దతు ఇవ్వదు',
            },
            failed: {
                title: 'కాపీ విఫలమైంది',
                description: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
            },
        },

        theme: {
            system: 'సిస్టమ్',
            light: 'హালకా',
            dark: 'నలుపు',
        },

        zoom: {
            on: 'ఆన్',
            off: 'ఆఫ్',
        },

        last_saved: 'చివరిగా సేవ్ చేయబడిన',
        saved: 'సేవ్ చేయబడింది',
        loading_diagram: 'చిత్రం లోడ్ అవుతోంది...',
        deselect_all: 'అన్ని ఎంచుకోకుండా ఉంచు',
        select_all: 'అన్ని ఎంచుకోండి',
        clear: 'తొలగించు',
        show_more: 'మరింత చూపించు',
        show_less: 'తక్కువ చూపించు',
        copy_to_clipboard: 'క్లిప్బోర్డుకు కాపీ చేయండి',
        copied: 'కాపీ చేయబడింది!',

        side_panel: {
            view_all_options: 'అన్ని ఎంపికలను చూడండి...',
            tables_section: {
                tables: 'పట్టికలు',
                add_table: 'పట్టికను జోడించు',
                add_view: 'వ్యూ జోడించండి',
                filter: 'ఫిల్టర్',
                collapse: 'అన్ని కూల్ చేయి',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'అన్ని పట్టికలు దాచబడ్డాయి',
                show_all: 'అన్ని చూపించు',

                table: {
                    fields: 'ఫీల్డులు',
                    nullable: 'నల్వాలు?',
                    primary_key: 'ప్రాథమిక కీ',
                    indexes: 'ఇండెక్సులు',
                    check_constraints: 'తనిఖీ పరిమితులు',
                    comments: 'వ్యాఖ్యలు',
                    no_comments: 'వ్యాఖ్యలు లేవు',
                    add_field: 'ఫీల్డ్ జోడించు',
                    add_index: 'ఇండెక్స్ జోడించు',
                    add_check: 'తనిఖీ జోడించు',
                    index_select_fields: 'ఫీల్డ్స్ ఎంచుకోండి',
                    no_types_found: 'ప్రకృతులు కనుగొనబడలేదు',
                    field_name: 'పేరు',
                    field_type: 'ప్రకృతి',
                    field_actions: {
                        title: 'ఫీల్డ్ గుణాలు',
                        unique: 'అద్వితీయ',
                        auto_increment: 'ఆటో ఇంక్రిమెంట్',
                        comments: 'వ్యాఖ్యలు',
                        no_comments: 'వ్యాఖ్యలు లేవు',
                        delete_field: 'ఫీల్డ్ తొలగించు',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'సూక్ష్మత',
                        scale: 'స్కేల్',
                    },
                    index_actions: {
                        title: 'ఇండెక్స్ గుణాలు',
                        name: 'పేరు',
                        unique: 'అద్వితీయ',
                        index_type: 'ఇండెక్స్ రకం',
                        delete_index: 'ఇండెక్స్ తొలగించు',
                    },
                    check_constraint_actions: {
                        title: 'తనిఖీ పరిమితి',
                        expression: 'వ్యక్తీకరణ',
                        delete: 'పరిమితిని తొలగించు',
                    },
                    table_actions: {
                        title: 'పట్టిక చర్యలు',
                        change_schema: 'స్కీమాను మార్చు',
                        add_field: 'ఫీల్డ్ జోడించు',
                        add_index: 'ఇండెక్స్ జోడించు',
                        // TODO: Translate
                        duplicate_table: 'Duplicate Table',
                        delete_table: 'పట్టికను తొలగించు',
                    },
                },
                empty_state: {
                    title: 'పట్టికలు లేవు',
                    description: 'ప్రారంభించడానికి ఒక పట్టిక సృష్టించండి',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'ఫిల్టర్',
                collapse: 'అన్ని కూల్ చేయి',
                add_relationship: 'సంబంధం జోడించు',
                relationships: 'సంబంధాలు',
                dependencies: 'ఆధారాలు',
                relationship: {
                    relationship: 'సంబంధం',
                    primary: 'ప్రాథమిక పట్టిక',
                    foreign: 'సంబంధిత పట్టిక',
                    cardinality: 'కార్డినాలిటీ',
                    delete_relationship: 'సంబంధం తొలగించు',
                    switch_tables: 'పట్టికలను మార్చు',
                    relationship_actions: {
                        title: 'చర్యలు',
                        delete_relationship: 'సంబంధం తొలగించు',
                    },
                },
                dependency: {
                    dependency: 'ఆధారం',
                    table: 'పట్టిక',
                    dependent_table: 'ఆధారిత వీక్షణ',
                    delete_dependency: 'ఆధారాన్ని తొలగించు',
                    dependency_actions: {
                        title: 'చర్యలు',
                        delete_dependency: 'ఆధారాన్ని తొలగించు',
                    },
                },
                empty_state: {
                    title: 'సంబంధాలు లేవు',
                    description: 'ప్రారంభించడానికి ఒక సంబంధం సృష్టించండి',
                },
            },

            areas_section: {
                areas: 'ప్రాంతాలు',
                add_area: 'ప్రాంతం జోడించండి',
                filter: 'ఫిల్టర్',
                clear: 'ఫిల్టర్‌ను క్లియర్ చేయండి',
                no_results: 'మీ ఫిల్టర్‌కు సరిపోలే ప్రాంతాలు కనుగొనబడలేదు.',

                area: {
                    area_actions: {
                        title: 'ప్రాంత చర్యలు',
                        edit_name: 'పేరు సవరించండి',
                        delete_area: 'ప్రాంతాన్ని తొలగించండి',
                    },
                },
                empty_state: {
                    title: 'ప్రాంతాలు లేవు',
                    description: 'ప్రారంభించడానికి ఒక ప్రాంతం సృష్టించండి',
                },
            },

            visuals_section: {
                visuals: 'Visuals',
                tabs: {
                    areas: 'ప్రాంతాలు',
                    notes: 'గమనికలు',
                },
            },

            notes_section: {
                filter: 'ఫిల్టర్',
                add_note: 'గమనిక జోడించండి',
                no_results: 'గమనికలు కనుగొనబడలేదు',
                clear: 'ఫిల్టర్‌ను క్లియర్ చేయండి',
                empty_state: {
                    title: 'గమనికలు లేవు',
                    description:
                        'కాన్వాస్‌పై టెక్స్ట్ ఉల్లేఖనలను జోడించడానికి ఒక గమనికను సృష్టించండి',
                },
                note: {
                    empty_note: 'ఖాళీ గమనిక',
                    note_actions: {
                        title: 'గమనిక చర్యలు',
                        edit_content: 'కంటెంట్‌ను సవరించండి',
                        delete_note: 'గమనికను తొలగించండి',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'అనుకూల రకాలు',
                filter: 'ఫిల్టర్',
                clear: 'ఫిల్టర్‌ను క్లియర్ చేయండి',
                no_results: 'మీ ఫిల్టర్‌కు సరిపోలే అనుకూల రకాలు కనుగొనబడలేదు.',
                new_type: 'కొత్త రకం',
                empty_state: {
                    title: 'అనుకూల రకాలు లేవు',
                    description:
                        'మీ డేటాబేస్‌లో అందుబాటులో ఉన్నప్పుడు అనుకూల రకాలు ఇక్కడ కనిపిస్తాయి',
                },
                custom_type: {
                    kind: 'రకం',
                    enum_values: 'Enum విలువలు',
                    composite_fields: 'ఫీల్డ్‌లు',
                    no_fields: 'ఫీల్డ్‌లు నిర్వచించబడలేదు',
                    no_values: 'ఏ enum విలువలు నిర్వచించబడలేదు',
                    field_name_placeholder: 'ఫీల్డ్ పేరు',
                    field_type_placeholder: 'రకాన్ని ఎంచుకోండి',
                    add_field: 'ఫీల్డ్ జోడించండి',
                    no_fields_tooltip:
                        'ఈ అనుకూల రకానికి ఫీల్డ్‌లు నిర్వచించబడలేదు',
                    custom_type_actions: {
                        title: 'చర్యలు',
                        highlight_fields: 'ఫీల్డ్‌లను హైలైట్ చేయండి',
                        delete_custom_type: 'తొలగించండి',
                        clear_field_highlight: 'హైలైట్ తొలగించండి',
                    },
                    delete_custom_type: 'రకాన్ని తొలగించండి',
                },
            },
        },

        toolbar: {
            zoom_in: 'జూమ్ ఇన్',
            zoom_out: 'జూమ్ అవుట్',
            save: 'సేవ్',
            show_all: 'అన్ని చూపించు',
            undo: 'తిరిగి చేయు',
            redo: 'మరలా చేయు',
            reorder_diagram: 'చిత్రాన్ని స్వయంచాలకంగా అమర్చండి',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'అవకాశించు పట్టికలను హైలైట్ చేయండి',
            filter: 'పట్టికలను ఫిల్టర్ చేయండి',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'మీ డేటాబేస్ ఏమిటి?',
                description:
                    'ప్రతి డేటాబేస్‌కు ప్రత్యేక లక్షణాలు మరియు సామర్థ్యాలు ఉంటాయి.',
                check_examples_long: 'ఉదాహరణలు చూడండి',
                check_examples_short: 'ఉదాహరణలు',
            },

            import_database: {
                title: 'మీ డేటాబేస్‌ను దిగుమతి చేసుకోండి',
                database_edition: 'డేటాబేస్ ఎడిషన్:',
                step_1: 'ఈ స్క్రిప్ట్ను మీ డేటాబేస్‌లో అమలు చేయండి:',
                step_2: 'స్క్రిప్ట్ ఫలితాన్ని ఇక్కడ పేస్ట్ చేయండి →',
                script_results_placeholder: 'స్క్రిప్ట్ ఫలితాలు ఇక్కడ...',
                ssms_instructions: {
                    button_text: 'SSMS సూచనల్ని చూపించు',
                    title: 'సూచనలు',
                    step_1: 'Tools > Options > Query Results > SQL Server కు వెళ్ళండి.',
                    step_2: 'మీరు "Results to Grid" ఉపయోగిస్తే, Maximum Characters Retrieved for Non-XML డేటా (9999999 కు సెట్ చేయండి) మార్చండి.',
                },
                instructions_link: 'సహాయం కావాలి? ఎలా చూడండి',
                check_script_result: 'స్క్రిప్ట్ ఫలితం తనిఖీ చేయండి',
            },

            cancel: 'రద్దు',
            // TODO: Translate
            import_from_file: 'Import from File',
            back: 'తిరుగు',
            empty_diagram: 'ఖాళీ డేటాబేస్',
            continue: 'కొనసాగించు',
            import: 'డిగుమతి',
        },

        open_diagram_dialog: {
            title: 'డేటాబేస్ తెరవండి',
            description: 'కింద ఉన్న జాబితా నుండి చిత్రాన్ని ఎంచుకోండి.',
            table_columns: {
                name: 'పేరు',
                created_at: 'రచించబడిన తేదీ',
                last_modified: 'చివరి సవరణ',
                tables_count: 'పట్టికలు',
            },
            cancel: 'రద్దు',
            open: 'తెరవు',
            new_database: 'కొత్త డేటాబేస్',

            diagram_actions: {
                open: 'తెరవు',
                duplicate: 'నకలు',
                delete: 'తొలగించు',
            },
        },

        export_sql_dialog: {
            title: 'SQL ఎగుమతి',
            description:
                'మీ చిత్ర స్కీమాను {{databaseType}} స్క్రిప్ట్‌గా ఎగుమతి చేయండి',
            close: 'మూసి వేయండి',
            loading: {
                text: '{{databaseType}} కోసం SQL ను ఉత్పత్తి చేయడంలో AI',
                description: 'ఇది 30 సెకన్లు పడుతుంది.',
            },
            error: {
                message:
                    'SQL స్క్రిప్ట్ ఉత్పత్తి చేయడంలో తప్పు. దయచేసి తర్వాతి సమయంలో ప్రయత్నించండి లేదా <0>మాతో సంప్రదించండి</0>.',
                description:
                    'మీ OPENAI_TOKEN ఉపయోగించి ప్రయత్నించండి, మాన్యువల్‌ను <0>ఇక్కడ</0> చూడండి.',
            },
        },

        create_relationship_dialog: {
            title: 'సంబంధం సృష్టించు',
            primary_table: 'ప్రాథమిక పట్టిక',
            primary_field: 'ప్రాథమిక ఫీల్డ్',
            referenced_table: 'సూచించబడిన పట్టిక',
            referenced_field: 'సూచించబడిన ఫీల్డ్',
            primary_table_placeholder: 'పట్టిక ఎంచుకోండి',
            primary_field_placeholder: 'ఫీల్డ్ ఎంచుకోండి',
            referenced_table_placeholder: 'పట్టిక ఎంచుకోండి',
            referenced_field_placeholder: 'ఫీల్డ్ ఎంచుకోండి',
            no_tables_found: 'ఏ పట్టికలు కూడా కనుగొనబడలేదు',
            no_fields_found: 'ఏ ఫీల్డ్‌లు కనుగొనబడలేదు',
            create: 'సృష్టించు',
            cancel: 'రద్దు',
        },

        import_database_dialog: {
            title: 'ప్రస్తుత చిత్రానికి దిగుమతి చేయండి',
            override_alert: {
                title: 'డేటాబేస్ దిగుమతి',
                content: {
                    alert: 'ఈ చిత్రాన్ని దిగుమతి చేసుకోవడం మునుపటి పట్టికలు మరియు సంబంధాలను ప్రభావితం చేస్తుంది.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> కొత్త పట్టికలు జోడించబడతాయి.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> కొత్త సంబంధాలు సృష్టించబడతాయి.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> పట్టికలు మళ్లీ రాయబడతాయి.',
                    proceed: 'మీరు కొనసాగించాలనుకుంటున్నారా?',
                },
                import: 'డిగుమతి',
                cancel: 'రద్దు',
            },
        },

        export_image_dialog: {
            title: 'చిత్రం ఎగుమతి',
            description: 'ఎగుమతి కోసం స్కేల్ ఫ్యాక్టర్ ఎంచుకోండి:',
            scale_1x: '1x (తక్కువ నాణ్యత)',
            scale_2x: '2x (సాధారణ నాణ్యత)',
            scale_4x: '4x (అత్యుత్తమ నాణ్యత)',
            cancel: 'రద్దు',
            export: 'ఎగుమతి',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'స్కీమాను ఎంచుకోండి',
            description:
                'ప్రస్తుతం బహుళ స్కీమాలు చూపబడుతున్నాయి. కొత్త పట్టిక కోసం ఒకటి ఎంచుకోండి.',
            cancel: 'రద్దు',
            confirm: 'కన్ఫర్మ్',
        },

        update_table_schema_dialog: {
            title: 'స్కీమా మార్చు',
            description: '{{tableName}} పట్టిక యొక్క స్కీమాను నవీకరించండి',
            cancel: 'రద్దు',
            confirm: 'మార్చు',
        },

        create_table_schema_dialog: {
            title: 'కొత్త స్కీమా సృష్టించండి',
            description:
                'ఇంకా ఏ స్కీమాలు లేవు. మీ పట్టికలను వ్యవస్థీకరించడానికి మీ మొదటి స్కీమాను సృష్టించండి.',
            create: 'సృష్టించు',
            cancel: 'రద్దు',
        },

        star_us_dialog: {
            title: 'మా సహాయంతో మెరుగుపరచండి!',
            description:
                'మీకు GitHub‌లో మాకు స్టార్ ఇవ్వాలనుకుంటున్నారా? కేవలం ఒక క్లిక్ మాత్రమే!',
            close: 'ఇప్పుడు కాదు',
            confirm: 'ఖచ్చితంగా!',
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
            one_to_one: 'ఒకటి_కీ_ఒకటి',
            one_to_many: 'ఒకటి_కీ_చాలా',
            many_to_one: 'చాలా_కీ_ఒకటి',
            many_to_many: 'చాలా_కీ_చాలా',
        },

        canvas_context_menu: {
            new_table: 'కొత్త పట్టిక',
            new_view: 'కొత్త వ్యూ',
            new_relationship: 'కొత్త సంబంధం',
            // TODO: Translate
            new_area: 'కొత్త ప్రాంతం',
            new_note: 'కొత్త నోట్',
        },

        table_node_context_menu: {
            edit_table: 'పట్టికను సవరించు',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            delete_table: 'పట్టికను తొలగించు',
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'అన్ని పట్టికలు దాచబడ్డాయి',
            show_all_tables: 'అన్ని చూపించు',
        },

        canvas_filter: {
            title: 'పట్టికలను ఫిల్టర్ చేయండి',
            search_placeholder: 'పట్టికలను శోధించండి...',
            group_by_schema: 'స్కీమా ద్వారా గ్రూప్ చేయండి',
            group_by_area: 'ప్రాంతం ద్వారా గ్రూప్ చేయండి',
            no_tables_found: 'పట్టికలు కనుగొనబడలేదు',
            empty_diagram_description: 'ప్రారంభించడానికి పట్టికను సృష్టించండి',
            no_tables_description:
                'మీ శోధన లేదా ఫిల్టర్‌ను సర్దుబాటు చేయడానికి ప్రయత్నించండి',
            clear_filter: 'ఫిల్టర్ క్లియర్ చేయండి',
        },

        // TODO: Translate
        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        // TODO: Translate
        tool_tips: {
            double_click_to_edit: 'Double-click to edit',
        },

        language_select: {
            change_language: 'భాష మార్చు',
        },

        on: 'ఆన్',
        off: 'ఆఫ్',
    },
};

export const teMetadata: LanguageMetadata = {
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te',
};
