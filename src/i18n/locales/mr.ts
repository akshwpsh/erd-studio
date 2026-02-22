import type { LanguageMetadata, LanguageTranslation } from '../types';

export const mr: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'नवीन',
            browse: 'उघडा',
            tables: 'टेबल',
            refs: 'Refs',
            dependencies: 'अवलंबने',
            custom_types: 'कस्टम प्रकार',
            visuals: 'Visuals',
        },
        menu: {
            actions: {
                actions: 'क्रिया',
                new: 'नवीन...',
                browse: 'सर्व डेटाबेस...',
                save: 'जतन करा',
                import: 'डेटाबेस इम्पोर्ट करा',
                export_sql: 'SQL एक्स्पोर्ट करा',
                export_as: 'म्हणून एक्स्पोर्ट करा',
                delete_diagram: 'हटवा',
            },
            edit: {
                edit: 'संपादन करा',
                undo: 'पूर्ववत करा',
                redo: 'पुन्हा करा',
                clear: 'साफ करा',
            },
            view: {
                view: 'दृश्य',
                show_sidebar: 'साइडबार दाखवा',
                hide_sidebar: 'साइडबार लपवा',
                hide_cardinality: 'कार्डिनॅलिटी लपवा',
                show_cardinality: 'कार्डिनॅलिटी दाखवा',
                hide_field_attributes: 'फील्ड गुणधर्म लपवा',
                show_field_attributes: 'फील्ड गुणधर्म दाखवा',
                zoom_on_scroll: 'स्क्रोलवर झूम करा',
                show_views: 'डेटाबेस व्ह्यूज',
                theme: 'थीम',
                show_dependencies: 'डिपेंडेन्सि दाखवा',
                hide_dependencies: 'डिपेंडेन्सि लपवा',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            backup: {
                // TODO: Add translations
                backup: 'Backup',
                export_diagram: 'Export Diagram',
                restore_diagram: 'Restore Diagram',
            },
            help: {
                help: 'मदत',
                docs_website: 'दस्तऐवजीकरण',
                join_discord: 'आमच्या डिस्कॉर्डमध्ये सामील व्हा',
            },
        },

        profile_dialog: {
            title: 'प्रोफाइल',
            description: 'तुमची खाते सेटिंग्ज पहा आणि अपडेट करा.',
            fields: {
                email: 'ईमेल',
                nickname: 'टोपणनाव',
                joined: 'सामील झाले',
                profile_image: 'प्रोफाइल प्रतिमा',
                current_password: 'वर्तमान पासवर्ड',
                new_password: 'नवीन पासवर्ड',
                confirm_new_password: 'नवीन पासवर्डची पुष्टी करा',
            },
            hints: {
                profile_image: 'फक्त प्रतिमा फाइल्स, 5MB पर्यंत.',
            },
            actions: {
                logout: 'लॉग आउट करा',
                logging_out: 'साइन आउट करत आहे...',
                cancel: 'रद्द करा',
                save_changes: 'बदल जतन करा',
                saving: 'जतन करत आहे...',
            },
            errors: {
                image_type: 'फक्त इमेज फाइल्सना परवानगी आहे.',
                image_size:
                    'प्रोफाइल प्रतिमा 5MB किंवा त्याहून लहान असणे आवश्यक आहे.',
                nickname_required: 'टोपणनाव आवश्यक आहे.',
                current_password_required: 'वर्तमान पासवर्ड आवश्यक आहे.',
                new_password_required: 'नवीन पासवर्ड आवश्यक आहे.',
                new_password_length:
                    'नवीन पासवर्ड किमान 6 वर्णांचा असणे आवश्यक आहे.',
                password_confirmation_mismatch:
                    'नवीन पासवर्ड पुष्टीकरण जुळत नाही.',
                update_failed: 'प्रोफाइल अपडेट करण्यात अयशस्वी.',
                signout_failed: 'साइन आउट करण्यात अयशस्वी.',
            },
            toasts: {
                password_update_failed: {
                    title: 'पासवर्ड अपडेट अयशस्वी',
                    description_with_error:
                        'प्रोफाइल बदल जतन केले गेले. {{error}}',
                    description_without_error:
                        'प्रोफाइल बदल जतन केले गेले, परंतु पासवर्ड अपडेट अयशस्वी.',
                },
                avatar_upload_failed: {
                    title: 'अवतार अपलोड अयशस्वी',
                    description_fallback:
                        'टोपणनाव आणि पासवर्ड बदल अजूनही लागू होते.',
                },
                profile_updated: {
                    title: 'प्रोफाइल अपडेट केले',
                    description: 'तुमचे प्रोफाइल बदल जतन केले गेले आहेत.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'आकृती शेअर करा',
        },

        share_dialog: {
            title: 'आकृती शेअर करा',
            description: 'सहकाऱ्यांना संपादक किंवा दर्शक म्हणून आमंत्रित करा.',
            access: {
                title: 'तुमचा प्रवेश',
                readonly_hint:
                    'केवळ मालक सदस्य आणि आमंत्रणे व्यवस्थापित करू शकतात.',
            },
            roles: {
                owner: 'मालक',
                editor: 'संपादक',
                viewer: 'दर्शक',
            },
            status: {
                pending: 'प्रलंबित',
                accepted: 'स्वीकारले',
                revoked: 'मागे घेतले',
                expired: 'कालबाह्य',
            },
            invite: {
                section_title: 'ईमेलद्वारे आमंत्रित करा',
                email_placeholder: 'teammate@example.com',
            },
            members: {
                section_title: 'सदस्य',
                empty: 'अद्याप कोणतेही आमंत्रित सदस्य नाहीत.',
            },
            invitations: {
                section_title: 'प्रलंबित आमंत्रणे',
                empty: 'प्रलंबित आमंत्रणे नाहीत.',
            },
            history: {
                section_title: 'आमंत्रण इतिहास',
                empty: 'अद्याप कोणतेही आमंत्रण नाही.',
            },
            actions: {
                invite: 'आमंत्रित करा',
                remove: 'काढा',
                revoke: 'मागे घ्या',
                copy_link: 'लिंक कॉपी करा',
                refresh: 'रिफ्रेश करा',
                close: 'बंद करा',
            },
            labels: {
                your_access: 'तुमचा प्रवेश:',
                expires: 'कालबाह्य',
                updated: 'अद्यतनित',
            },
            toasts: {
                invite_created: {
                    title: 'आमंत्रण तयार केले',
                    description:
                        '{{email}} ला {{role}} म्हणून आमंत्रित केले होते.',
                },
                invite_failed: {
                    title: 'आमंत्रण अयशस्वी',
                },
                role_update_failed: {
                    title: 'रोल अपडेट अयशस्वी',
                },
                remove_failed: {
                    title: 'सदस्य काढणे अयशस्वी',
                },
                revoke_failed: {
                    title: 'आमंत्रण मागे घेणे अयशस्वी',
                },
                copy_success: {
                    title: 'आमंत्रण लिंक कॉपी केली',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'कॉपी अयशस्वी',
                    description: 'आमंत्रण लिंक कॉपी करू शकलो नाही.',
                },
            },
            errors: {
                email_required: 'ईमेल आवश्यक आहे.',
                unknown_error: 'अज्ञात त्रुटी.',
                no_diagram_selected: 'कोणताही आकृती निवडलेला नाही.',
            },
        },

        auth_gate: {
            title: 'ERDS मध्ये साइन इन करा',
            subtitle:
                'तुमचे रेखाचित्र तुमच्या Supabase ��ात्यात संग्रहित आहेत.',
            tabs: {
                sign_in: 'साइन इन करा',
                sign_up: 'साइन अप करा',
            },
            placeholders: {
                nickname: 'टोपणनाव',
                email: 'you@example.com',
                password: 'पासवर्ड',
                confirm_password: 'पासवर्डची पुष्टी करा',
            },
            actions: {
                sign_in: 'साइन इन करा',
                signing_in: 'साइन इन करत आहे...',
                create_account: 'खाते तयार करा',
                creating_account: 'खाते तयार करत आहे...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase कॉन्फिगर केलेले नाही',
                supabase_not_configured_description:
                    'सुरू ठेवण्यासाठी SUPABASE_URL आणि SUPABASE_PUBLISHABLE_DEFAULT_KEY पर्यावरण व्हेरिएबल्स जोडा.',
                success_title: 'यशस्वी',
                authentication_failed_title: 'प्रमाणीकरण अयशस्वी',
            },
            validation: {
                email_and_password_required: 'ईमेल आणि पासवर्ड आवश्यक आहे.',
                nickname_required: 'टोपणनाव आवश्यक आहे.',
                email_required: 'ईमेल आवश्यक आहे.',
                password_required: 'पासवर्ड आवश्यक आहे.',
                password_min_length:
                    'पासवर्ड किमान 6 वर्णांचा असणे आवश्यक आहे.',
                password_confirmation_mismatch: 'पासवर्ड पुष्टीकरण जुळत नाही.',
                sign_in_failed: 'साइन इन करण्यात अयशस्वी.',
                create_account_failed: 'खाते तयार करण्यात अयशस्वी.',
            },
            success: {
                account_created:
                    'खाते तयार केले. ईमेल पुष्टीकरण सक्षम केले असल्यास, साइन इन करण्यापूर्वी तुमचा इनबॉक्स तपासा.',
            },
        },

        invite_accept_page: {
            loading: 'आमंत्रण स्वीकारत आहे...',
            error_title: 'आमंत्रण स्वीकारता आले नाही',
            actions: {
                retry: 'पुन्हा प्रयत्न करा',
                go_to_app: 'ॲपवर जा',
            },
            errors: {
                expired: 'ही आमंत्रण लिंक कालबाह्य झाली आहे.',
                mismatch: 'हे आमंत्रण वेगळ्या ईमेल खात्यावर पाठवले होते.',
                revoked: 'हे आमंत्रण मागे घेण्यात आले आहे.',
                not_pending: 'हे आमंत्रण यापुढे सक्रिय नाही.',
                not_found: 'आमंत्रण सापडले नाही.',
                token_missing: 'आमंत्रण टोकन गहाळ आहे.',
                supabase_not_configured: 'Supabase कॉन्फिगर केलेले नाही.',
                accept_failed: 'आमंत्रण स्वीकारण्यात अयशस्वी.',
                unknown_error: 'अज्ञात त्रुटी.',
                no_diagram_returned:
                    'आमंत्रण स्वीकारले, परंतु एकही आकृती परत केली नाही.',
                invitee_email_required: 'आमंत्रित ईमेल आवश्यक आहे.',
            },
        },

        collab_presence: {
            online_count: '{{count}} ऑनलाइन',
            role: {
                owner: 'मालक',
                editor: 'संपादक',
                viewer: 'दर्शक',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'मेघ समक्रमण पुनर्संचयित केले',
            restored_description: 'बदल पुन्हा Supabase वर समक्रमित होत आहेत.',
            paused_title: 'मेघ समक्रमण थांबवले',
            paused_description:
                'तुमचे स्थानिक बदल सुरक्षित आहेत आणि आपोआप पुन्हा प्रयत्न केले जातील.',
            read_only_title: 'केवळ-वाचनीय प्रवेश',
            read_only_description:
                'तुम्ही हा सामायिक केलेला आकृती पाहू शकता परंतु बदल जतन करू शकत नाही.',
            access_removed_title: 'प्रवेश काढला',
            access_removed_description:
                'या सामायिक आकृतीमधील तुमचा प्रवेश काढून टाकण्यात आला आहे.',
        },

        collaboration_errors: {
            expired: 'ही आमंत्रण लिंक कालबाह्य झाली आहे.',
            mismatch: 'हे आमंत्रण वेगळ्या ईमेल खात्यावर पाठवले होते.',
            revoked: 'हे आमंत्रण मागे घेण्यात आले आहे.',
            not_pending: 'हे आमंत्रण यापुढे सक्रिय नाही.',
            not_found: 'आमंत्रण सापडले नाही.',
            invitee_email_required: 'आमंत्रित ईमेल आवश्यक आहे.',
            token_missing: 'आमंत्रण टोकन आवश्यक आहे.',
            supabase_not_configured: 'Supabase कॉन्फिगर केलेले नाही.',
        },

        delete_diagram_alert: {
            title: 'आरेख हटवा',
            description:
                'ही क्रिया पूर्ववत केली जाऊ शकत नाही. हे आरेख कायमचे हटवेल.',
            cancel: 'रद्द करा',
            delete: 'हटवा',
        },

        clear_diagram_alert: {
            title: 'आरेख साफ करा',
            description:
                'ही क्रिया पूर्ववत केली जाऊ शकत नाही. हे आरेखातील सर्व डेटा कायमचे हटवेल.',
            cancel: 'रद्द करा',
            clear: 'साफ करा',
        },

        reorder_diagram_alert: {
            title: 'आरेख स्वयंचलित व्यवस्थित करा',
            description:
                'ही क्रिया आरेखातील सर्व टेबल्सची पुनर्रचना करेल. तुम्हाला पुढे जायचे आहे का?',
            reorder: 'स्वयंचलित व्यवस्थित करा',
            cancel: 'रद्द करा',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'कॉपी अयशस्वी',
                description: 'क्लिपबोर्ड समर्थित नाही',
            },
            failed: {
                title: 'कॉपी अयशस्वी',
                description: 'काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.',
            },
        },

        theme: {
            system: 'सिस्टम',
            light: 'लाईट',
            dark: 'डार्क',
        },

        zoom: {
            on: 'चालू',
            off: 'बंद',
        },

        last_saved: 'शेवटचे जतन केले',
        saved: 'जतन केले',
        loading_diagram: 'आरेख लोड करत आहे...',
        deselect_all: 'सर्व निवड रद्द करा',
        select_all: 'सर्व निवडा',
        clear: 'साफ करा',
        show_more: 'अधिक दाखवा',
        show_less: 'कमी दाखवा',
        // TODO: Add translations
        copy_to_clipboard: 'Copy to Clipboard',
        // TODO: Add translations
        copied: 'Copied!',

        side_panel: {
            view_all_options: 'सर्व पर्याय पहा...',
            tables_section: {
                tables: 'टेबल्स',
                add_table: 'टेबल जोडा',
                add_view: 'व्ह्यू जोडा',
                filter: 'फिल्टर',
                collapse: 'सर्व संकुचित करा',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'सर्व टेबल्स लपवलेले आहेत',
                show_all: 'सर्व दाखवा',

                table: {
                    fields: 'फील्ड्स',
                    nullable: 'नल करण्यायोग्य?',
                    primary_key: 'प्राथमिक की',
                    indexes: 'सूचकांक',
                    check_constraints: 'तपासणी निर्बंध',
                    comments: 'टिप्पण्या',
                    no_comments: 'कोणत्याही टिप्पणी नाहीत',
                    add_field: 'फील्ड जोडा',
                    add_index: 'सूचकांक जोडा',
                    add_check: 'तपासणी जोडा',
                    index_select_fields: 'फील्ड निवडा',
                    no_types_found: 'कोणतेही प्रकार सापडले नाहीत',
                    field_name: 'नाव',
                    field_type: 'प्रकार',
                    field_actions: {
                        title: 'फील्ड गुणधर्म',
                        unique: 'युनिक',
                        auto_increment: 'ऑटो इंक्रिमेंट',
                        comments: 'टिप्पण्या',
                        no_comments: 'कोणत्याही टिप्पणी नाहीत',
                        delete_field: 'फील्ड हटवा',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'अचूकता',
                        scale: 'प्रमाण',
                    },
                    index_actions: {
                        title: 'इंडेक्स गुणधर्म',
                        name: 'नाव',
                        unique: 'युनिक',
                        index_type: 'इंडेक्स प्रकार',
                        delete_index: 'इंडेक्स हटवा',
                    },
                    check_constraint_actions: {
                        title: 'तपासणी निर्बंध',
                        expression: 'अभिव्यक्ती',
                        delete: 'निर्बंध हटवा',
                    },
                    table_actions: {
                        title: 'टेबल एक्शन',
                        change_schema: 'स्कीमा बदला',
                        add_field: 'फील्ड जोडा',
                        add_index: 'इंडेक्स जोडा',
                        delete_table: 'टेबल हटवा',
                        // TODO: Add translations
                        duplicate_table: 'Duplicate Table',
                    },
                },
                empty_state: {
                    title: 'कोणतेही टेबल नाहीत',
                    description: 'सुरू करण्यासाठी एक टेबल तयार करा',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'फिल्टर',
                collapse: 'सर्व संकुचित करा',
                add_relationship: 'रिलेशनशिप जोडा',
                relationships: 'रिलेशनशिप',
                dependencies: 'डिपेंडेन्सि',
                relationship: {
                    relationship: 'रिलेशनशिप',
                    primary: 'प्राथमिक टेबल',
                    foreign: 'संबंधित टेबल',
                    cardinality: 'कार्डिनॅलिटी',
                    delete_relationship: 'हटवा',
                    switch_tables: 'टेबल बदला',
                    relationship_actions: {
                        title: 'क्रिया',
                        delete_relationship: 'हटवा',
                    },
                },
                dependency: {
                    dependency: 'डिपेंडेन्सि',
                    table: 'टेबल',
                    dependent_table: 'डिपेंडेन्सि दृश्य',
                    delete_dependency: 'हटवा',
                    dependency_actions: {
                        title: 'क्रिया',
                        delete_dependency: 'हटवा',
                    },
                },
                empty_state: {
                    title: 'कोणतेही रिलेशनशिप नाहीत',
                    description: 'सुरू करण्यासाठी एक रिलेशनशिप तयार करा',
                },
            },

            areas_section: {
                areas: 'क्षेत्रे',
                add_area: 'क्षेत्र जोडा',
                filter: 'फिल्टर',
                clear: 'फिल्टर साफ करा',
                no_results:
                    'तुमच्या फिल्टरशी जुळणारे कोणतेही क्षेत्र सापडले नाही।',

                area: {
                    area_actions: {
                        title: 'क्षेत्र क्रिया',
                        edit_name: 'नाव संपादित करा',
                        delete_area: 'क्षेत्र हटवा',
                    },
                },
                empty_state: {
                    title: 'क्षेत्रे नाहीत',
                    description: 'सुरू करण्यासाठी क्षेत्र तयार करा',
                },
            },

            visuals_section: {
                visuals: 'Visuals',
                tabs: {
                    areas: 'क्षेत्रे',
                    notes: 'नोट्स',
                },
            },

            notes_section: {
                filter: 'फिल्टर',
                add_note: 'नोट जोडा',
                no_results: 'कोणत्याही नोट्स सापडल्या नाहीत',
                clear: 'फिल्टर साफ करा',
                empty_state: {
                    title: 'नोट्स नाहीत',
                    description:
                        'कॅनव्हासवर मजकूर भाष्य जोडण्यासाठी एक नोट तयार करा',
                },
                note: {
                    empty_note: 'रिकामी नोट',
                    note_actions: {
                        title: 'नोट क्रिया',
                        edit_content: 'सामग्री संपादित करा',
                        delete_note: 'नोट हटवा',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'कस्टम प्रकार',
                filter: 'फिल्टर',
                clear: 'फिल्टर साफ करा',
                no_results:
                    'तुमच्या फिल्टरशी जुळणारा कोणताही कस्टम प्रकार सापडला नाही.',
                new_type: 'नवीन प्रकार',
                empty_state: {
                    title: 'कस्टम प्रकार नाहीत',
                    description:
                        'तुमच्या डेटाबेसमध्ये उपलब्ध असताना कस्टम प्रकार येथे दिसतील',
                },
                custom_type: {
                    kind: 'प्रकार',
                    enum_values: 'Enum मूल्ये',
                    composite_fields: 'फील्ड्स',
                    no_fields: 'कोणतेही फील्ड परिभाषित नाहीत',
                    no_values: 'कोणतीही enum मूल्ये परिभाषित नाहीत',
                    field_name_placeholder: 'फील्डचे नाव',
                    field_type_placeholder: 'प्रकार निवडा',
                    add_field: 'फील्ड जोडा',
                    no_fields_tooltip:
                        'या कस्टम प्रकारासाठी कोणतेही फील्ड परिभाषित नाहीत',
                    custom_type_actions: {
                        title: 'क्रिया',
                        highlight_fields: 'फील्ड्स हायलाइट करा',
                        delete_custom_type: 'हटवा',
                        clear_field_highlight: 'हायलाइट काढा',
                    },
                    delete_custom_type: 'प्रकार हटवा',
                },
            },
        },

        toolbar: {
            zoom_in: 'झूम इन',
            zoom_out: 'झूम आउट',
            save: 'जतन करा',
            show_all: 'सर्व दाखवा',
            undo: 'पूर्ववत करा',
            redo: 'पुन्हा करा',
            reorder_diagram: 'आरेख स्वयंचलित व्यवस्थित करा',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'ओव्हरलॅपिंग टेबल्स हायलाइट करा',
            filter: 'टेबल्स फिल्टर करा',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'तुमचा डेटाबेस कोणता आहे?',
                description:
                    'प्रत्येक डेटाबेसचे स्वतःचे युनिक वैशिष्ट्ये आणि क्षमता आहेत.',
                check_examples_long: 'उदाहरणे तपासा',
                check_examples_short: 'उदाहरणे',
            },

            import_database: {
                title: 'तुमचा डेटाबेस आयात करा',
                database_edition: 'डेटाबेस संस्करण:',
                step_1: 'तुमच्या डेटाबेसमध्ये हा स्क्रिप्ट चालवा:',
                step_2: 'स्क्रिप्टचा परिणाम येथे पेस्ट करा →',
                script_results_placeholder: 'स्क्रिप्ट परिणाम येथे...',
                ssms_instructions: {
                    button_text: 'SSMS सूचना',
                    title: 'सूचना',
                    step_1: 'टूल्स > पर्याय > क्वेरी परिणाम > SQL सर्व्हर वर जा.',
                    step_2: 'जर तुम्ही "ग्रिडला परिणाम" वापरत असाल, तर नॉन-XML डेटासाठी जास्तीत जास्त वर्ण पुनर्प्राप्ती बदला (9999999 वर सेट करा).',
                },
                // TODO: Add translations
                instructions_link: 'Need help? Watch how',
                check_script_result: 'Check Script Result',
            },

            cancel: 'रद्द करा',
            // TODO: Add translations
            import_from_file: 'Import from File',
            back: 'मागे',
            empty_diagram: 'रिक्त डेटाबेस',
            continue: 'सुरू ठेवा',
            import: 'आयात करा',
        },

        open_diagram_dialog: {
            title: 'डेटाबेस उघडा',
            description: 'खालील यादीतून उघडण्यासाठी एक आरेख निवडा.',
            table_columns: {
                name: 'नाव',
                created_at: 'तयार केले',
                last_modified: 'शेवटचे बदलले',
                tables_count: 'टेबल्स',
            },
            cancel: 'रद्द करा',
            open: 'उघडा',
            new_database: 'नवीन डेटाबेस',

            diagram_actions: {
                open: 'उघडा',
                duplicate: 'डुप्लिकेट',
                delete: 'हटवा',
            },
        },

        export_sql_dialog: {
            title: 'SQL निर्यात करा',
            description:
                'तुमच्या आरेख स्कीमाला {{databaseType}} स्क्रिप्टमध्ये निर्यात करा',
            close: 'बंद करा',
            loading: {
                text: 'AI {{databaseType}} साठी SQL तयार करत आहे...',
                description: 'याला 30 सेकंद लागतील.',
            },
            error: {
                message:
                    'SQL स्क्रिप्ट तयार करताना एरर. कृपया नंतर पुन्हा प्रयत्न करा किंवा <0>आमच्याशी संपर्क साधा</0>.',
                description:
                    'तुमचा OPENAI_TOKEN वापरण्यास मोकळे रहा, मॅन्युअल <0>येथे</0> पहा.',
            },
        },

        create_relationship_dialog: {
            title: 'रिलेशनशिप तयार करा',
            primary_table: 'प्राथमिक टेबल',
            primary_field: 'रेफरन्स फील्ड',
            referenced_table: 'रेफरन्स टेबल',
            referenced_field: 'रेफरन्स फील्ड',
            primary_table_placeholder: 'टेबल निवडा',
            primary_field_placeholder: 'फील्ड निवडा',
            referenced_table_placeholder: 'टेबल निवडा',
            referenced_field_placeholder: 'फील्ड निवडा',
            no_tables_found: 'कोणतेही टेबल सापडले नाहीत',
            no_fields_found: 'कोणतेही फील्ड सापडले नाहीत',
            create: 'तयार करा',
            cancel: 'रद्द करा',
        },

        import_database_dialog: {
            title: 'सध्याच्या आरेखात आयात करा',
            override_alert: {
                title: 'डेटाबेस आयात करा',
                content: {
                    alert: 'हा आरेख आयात केल्याने सध्याचे टेबल्स आणि रिलेशनशिप वर फरक पडेल.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> नवीन टेबल्स जोडले जातील.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> नवीन रिलेशनशिप तयार केले जातील.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> टेबल्स अधिलिखित केले जातील.',
                    proceed: 'तुम्हाला पुढे जायचे आहे का?',
                },
                import: 'आयात करा',
                cancel: 'रद्द करा',
            },
        },

        export_image_dialog: {
            title: 'इमेज निर्यात करा',
            description: 'एक्स्पोर्ट करण्यासाठी स्केल फॅक्टर निवडा:',
            scale_1x: '1x (कमी गुणवत्ता)',
            scale_2x: '2x (सामान्य गुणवत्ता)',
            scale_4x: '4x (सर्वोत्तम गुणवत्ता)',
            cancel: 'रद्द करा',
            export: 'निर्यात करा',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'स्कीमा निवडा',
            description:
                'सध्या एकाधिक स्कीमा प्रदर्शित आहेत. नवीन टेबलसाठी एक निवडा.',
            cancel: 'रद्द करा',
            confirm: 'पुष्टी करा',
        },

        update_table_schema_dialog: {
            title: 'स्कीमा बदला',
            description: 'टेबल "{{tableName}}" स्कीमा अपडेट करा',
            cancel: 'रद्द करा',
            confirm: 'बदला',
        },

        create_table_schema_dialog: {
            title: 'नवीन स्कीमा तयार करा',
            description:
                'अजून कोणतीही स्कीमा अस्तित्वात नाही. आपल्या टेबल्स व्यवस्थित करण्यासाठी आपली पहिली स्कीमा तयार करा.',
            create: 'तयार करा',
            cancel: 'रद्द करा',
        },

        star_us_dialog: {
            title: 'आम्हाला सुधारण्यास मदत करा!',
            description:
                'तुम्हाला GitHub वर आम्हाला स्टार करायचे आहे का? हे फक्त एक क्लिक दूर आहे!',
            close: 'आता नाही',
            confirm: 'नक्कीच!',
        },

        // TODO: Add translations
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

        // TO
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
            one_to_one: 'एक ते एक',
            one_to_many: 'एक ते अनेक',
            many_to_one: 'अनेक ते एक',
            many_to_many: 'अनेक ते अनेक',
        },

        canvas_context_menu: {
            new_table: 'नवीन टेबल',
            new_view: 'नवीन व्ह्यू',
            new_relationship: 'नवीन रिलेशनशिप',
            // TODO: Translate
            new_area: 'नवीन क्षेत्र',
            new_note: 'नवीन टीप',
        },

        table_node_context_menu: {
            edit_table: 'टेबल संपादित करा',
            delete_table: 'टेबल हटवा',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'सर्व टेबल्स लपवलेले आहेत',
            show_all_tables: 'सर्व दाखवा',
        },

        canvas_filter: {
            title: 'टेबल्स फिल्टर करा',
            search_placeholder: 'टेबल्स शोधा...',
            group_by_schema: 'स्कीमानुसार गट करा',
            group_by_area: 'क्षेत्रानुसार गट करा',
            no_tables_found: 'कोणतेही टेबल सापडले नाही',
            empty_diagram_description: 'सुरू करण्यासाठी टेबल तयार करा',
            no_tables_description:
                'तुमची शोध किंवा फिल्टर समायोजित करण्याचा प्रयत्न करा',
            clear_filter: 'फिल्टर साफ करा',
        },

        // TODO: Add translations
        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        // TODO: Add translations
        tool_tips: {
            double_click_to_edit: 'Double-click to edit',
        },

        language_select: {
            change_language: 'भाषा बदला',
        },

        on: 'चालू',
        off: 'बंद',
    },
};

export const mrMetadata: LanguageMetadata = {
    name: 'Marathi',
    nativeName: 'मराठी',
    code: 'mr',
};
