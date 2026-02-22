import type { LanguageMetadata, LanguageTranslation } from '../types';

export const tr: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'Yeni',
            browse: 'Aç',
            tables: 'Tablolar',
            refs: 'Refs',
            dependencies: 'Bağımlılıklar',
            custom_types: 'Özel Tipler',
            visuals: 'Görseller',
        },
        menu: {
            actions: {
                actions: 'Eylemler',
                new: 'Yeni...',
                browse: 'Tüm veritabanları...',
                save: 'Kaydet',
                import: 'Veritabanı İçe Aktar',
                export_sql: 'SQL Olarak Dışa Aktar',
                export_as: 'Olarak Dışa Aktar',
                delete_diagram: 'Sil',
            },
            edit: {
                edit: 'Düzenle',
                undo: 'Geri Al',
                redo: 'Yinele',
                clear: 'Temizle',
            },
            view: {
                view: 'Görünüm',
                show_sidebar: 'Kenar Çubuğunu Göster',
                hide_sidebar: 'Kenar Çubuğunu Gizle',
                hide_cardinality: 'Kardinaliteyi Gizle',
                show_cardinality: 'Kardinaliteyi Göster',
                show_field_attributes: 'Alan Özelliklerini Göster',
                hide_field_attributes: 'Alan Özelliklerini Gizle',
                zoom_on_scroll: 'Kaydırarak Yakınlaştır',
                show_views: 'Veritabanı Görünümleri',
                theme: 'Tema',
                show_dependencies: 'Bağımlılıkları Göster',
                hide_dependencies: 'Bağımlılıkları Gizle',
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
                help: 'Yardım',
                docs_website: 'Belgeleme',
                join_discord: "Discord'a Katıl",
            },
        },

        profile_dialog: {
            title: 'Profili',
            description: 'Hesap ayarlarınızı görüntüleyin ve güncelleyin.',
            fields: {
                email: 'E-posta',
                nickname: 'Takma ad',
                joined: 'Katıldı',
                profile_image: 'Profil resmi',
                current_password: 'Mevcut şifre',
                new_password: 'Yeni şifre',
                confirm_new_password: 'Yeni şifreyi onaylayın',
            },
            hints: {
                profile_image: "Yalnızca görüntü dosyaları, 5 MB'a kadar.",
            },
            actions: {
                logout: 'Oturumu kapat',
                logging_out: 'Oturum kapatılıyor...',
                cancel: 'İptal',
                save_changes: 'Değişiklikleri kaydet',
                saving: 'Kaydediliyor...',
            },
            errors: {
                image_type: 'Yalnızca resim dosyalarına izin verilir.',
                image_size: 'Profil resmi 5 MB veya daha küçük olmalıdır.',
                nickname_required: 'Takma ad gerekli.',
                current_password_required: 'Mevcut şifre gerekli.',
                new_password_required: 'Yeni şifre gerekli.',
                new_password_length:
                    'Yeni şifre en az 6 karakterden oluşmalıdır.',
                password_confirmation_mismatch: 'Yeni şifre onayı eşleşmiyor.',
                update_failed: 'Profil güncellenemedi.',
                signout_failed: 'Oturum kapatılamadı.',
            },
            toasts: {
                password_update_failed: {
                    title: 'Şifre güncellemesi başarısız oldu',
                    description_with_error:
                        'Profil değişiklikleri kaydedildi. {{error}}',
                    description_without_error:
                        'Profil değişiklikleri kaydedildi ancak şifre güncellemesi başarısız oldu.',
                },
                avatar_upload_failed: {
                    title: 'Avatar yüklemesi başarısız oldu',
                    description_fallback:
                        'Takma ad ve şifre değişiklikleri hâlâ uygulanıyordu.',
                },
                profile_updated: {
                    title: 'Profil güncellendi',
                    description: 'Profil değişiklikleriniz kaydedildi.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'Paylaşım diyagramı',
        },

        share_dialog: {
            title: 'Paylaşım diyagramı',
            description:
                'Ortak çalışanları editör veya görüntüleyici olarak davet edin.',
            access: {
                title: 'Erişiminiz',
                readonly_hint:
                    'Üyeleri ve davetiyeleri yalnızca sahibi yönetebilir.',
            },
            roles: {
                owner: 'Sahip',
                editor: 'Editör',
                viewer: 'Görüntüleyici',
            },
            status: {
                pending: 'Beklemede',
                accepted: 'Kabul edildi',
                revoked: 'İptal edildi',
                expired: 'Süresi dolmuş',
            },
            invite: {
                section_title: 'E-postayla davet et',
                email_placeholder: 'takım arkadaşı@example.com',
            },
            members: {
                section_title: 'Üyeler',
                empty: 'Henüz davet edilmiş üye yok.',
            },
            invitations: {
                section_title: 'Bekleyen davetiyeler',
                empty: 'Bekleyen davetiye yok.',
            },
            history: {
                section_title: 'Davetiye geçmişi',
                empty: 'Henüz davetiye yok.',
            },
            actions: {
                invite: 'Davet et',
                remove: 'Kaldır',
                revoke: 'İptal Et',
                copy_link: 'Bağlantıyı kopyala',
                refresh: 'Yenile',
                close: 'Kapat',
            },
            labels: {
                your_access: 'Erişiminiz:',
                expires: 'Süresi doluyor',
                updated: 'Güncellendi',
            },
            toasts: {
                invite_created: {
                    title: 'Davetiye oluşturuldu',
                    description: '{{email}}, {{role}} olarak davet edildi.',
                },
                invite_failed: {
                    title: 'Davet başarısız oldu',
                },
                role_update_failed: {
                    title: 'Role update failed',
                },
                remove_failed: {
                    title: 'Üye kaldırılamadı',
                },
                revoke_failed: {
                    title: 'Daveti iptal etme başarısız oldu',
                },
                copy_success: {
                    title: 'Davet bağlantısı kopyalandı',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'Kopyalama başarısız oldu',
                    description: 'Davet bağlantısı kopyalanamadı.',
                },
            },
            errors: {
                email_required: 'E-posta gereklidir.',
                unknown_error: 'Bilinmeyen hata.',
                no_diagram_selected: 'Diyagram seçilmedi.',
            },
        },

        auth_gate: {
            title: "ERDS'da oturum açın",
            subtitle: 'Diyagramlarınız Supabase hesabınızda saklanır.',
            tabs: {
                sign_in: 'Oturum aç',
                sign_up: 'Kayıt ol',
            },
            placeholders: {
                nickname: 'Takma ad',
                email: 'you@example.com',
                password: 'Şifre',
                confirm_password: 'Şifreyi onayla',
            },
            actions: {
                sign_in: 'Oturum aç',
                signing_in: 'Oturum açılıyor...',
                create_account: 'Hesap oluştur',
                creating_account: 'Hesap oluşturuluyor...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase yapılandırılmamış',
                supabase_not_configured_description:
                    'Devam etmek için SUPABASE_URL ve SUPABASE_PUBLISHABLE_DEFAULT_KEY ortam değişkenlerini ekleyin.',
                success_title: 'Başarılı',
                authentication_failed_title: 'Kimlik doğrulama başarısız oldu',
            },
            validation: {
                email_and_password_required: 'E-posta ve şifre gereklidir.',
                nickname_required: 'Takma ad gerekli.',
                email_required: 'E-posta gereklidir.',
                password_required: 'Şifre gerekli.',
                password_min_length: 'Şifre en az 6 karakter olmalıdır.',
                password_confirmation_mismatch: 'Şifre onayı eşleşmiyor.',
                sign_in_failed: 'Oturum açılamadı.',
                create_account_failed: 'Hesap oluşturulamadı.',
            },
            success: {
                account_created:
                    'Hesap oluşturuldu. E-posta onayı etkinse oturum açmadan önce gelen kutunuzu kontrol edin.',
            },
        },

        invite_accept_page: {
            loading: 'Davet kabul ediliyor...',
            error_title: 'Davet kabul edilemedi',
            actions: {
                retry: 'Tekrar dene',
                go_to_app: 'Uygulamaya git',
            },
            errors: {
                expired: 'Bu davet bağlantısının süresi doldu.',
                mismatch: 'Bu davetiye farklı bir e-posta hesabına gönderildi.',
                revoked: 'Bu davet iptal edildi.',
                not_pending: 'Bu davetiye artık aktif değil.',
                not_found: 'Davetiye bulunamadı.',
                token_missing: 'Davetiye jetonu eksik.',
                supabase_not_configured: 'Supabase yapılandırılmamış.',
                accept_failed: 'Davet kabul edilemedi.',
                unknown_error: 'Bilinmeyen hata.',
                no_diagram_returned:
                    'Davet kabul edildi, ancak herhangi bir diyagram döndürülmedi.',
                invitee_email_required:
                    'Davet edilenin e-posta adresi gereklidir.',
            },
        },

        collab_presence: {
            online_count: '{{count}} çevrimiçi',
            role: {
                owner: 'Sahip',
                editor: 'Editör',
                viewer: 'Görüntüleyici',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'Bulut senkronizasyonu geri yüklendi',
            restored_description:
                'Değişiklikler tekrar Supabase ile senkronize ediliyor.',
            paused_title: 'Bulut senkronizasyonu duraklatıldı',
            paused_description:
                'Yerel değişiklikleriniz güvende ve otomatik olarak yeniden denenecek.',
            read_only_title: 'Salt okunur erişim',
            read_only_description:
                'Bu paylaşılan diyagramı görüntüleyebilirsiniz ancak değişiklikleri kaydedemezsiniz.',
            access_removed_title: 'Erişim kaldırıldı',
            access_removed_description:
                'Bu paylaşılan şemaya erişiminiz kaldırıldı.',
        },

        collaboration_errors: {
            expired: 'Bu davet bağlantısının süresi doldu.',
            mismatch: 'Bu davetiye farklı bir e-posta hesabına gönderildi.',
            revoked: 'Bu davet iptal edildi.',
            not_pending: 'Bu davetiye artık aktif değil.',
            not_found: 'Davetiye bulunamadı.',
            invitee_email_required: 'Davet edilenin e-posta adresi gereklidir.',
            token_missing: 'Davetiye jetonu gerekli.',
            supabase_not_configured: 'Supabase yapılandırılmamış.',
        },

        delete_diagram_alert: {
            title: 'Diyagramı Sil',
            description:
                'Bu işlem geri alınamaz. Diyagram kalıcı olarak silinecektir.',
            cancel: 'İptal',
            delete: 'Sil',
        },

        clear_diagram_alert: {
            title: 'Diyagramı Temizle',
            description:
                'Bu işlem geri alınamaz. Diyagramdaki tüm veriler kalıcı olarak silinecektir.',
            cancel: 'İptal',
            clear: 'Temizle',
        },

        reorder_diagram_alert: {
            title: 'Diyagramı Otomatik Düzenle',
            description:
                'Bu işlem tüm tabloları yeniden düzenleyecektir. Devam etmek istiyor musunuz?',
            reorder: 'Otomatik Düzenle',
            cancel: 'İptal',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'Kopyalama başarısız',
                description: 'Panoya desteklenmiyor',
            },
            failed: {
                title: 'Kopyalama başarısız',
                description: 'Bir şeyler ters gitti. Lütfen tekrar deneyin.',
            },
        },

        theme: {
            system: 'Sistem',
            light: 'Açık',
            dark: 'Koyu',
        },

        zoom: {
            on: 'Açık',
            off: 'Kapalı',
        },

        last_saved: 'Son kaydedilen',
        saved: 'Kaydedildi',
        loading_diagram: 'Diyagram yükleniyor...',
        deselect_all: 'Hepsini Seçme',
        select_all: 'Hepsini Seç',
        clear: 'Temizle',
        show_more: 'Daha Fazla Göster',
        show_less: 'Daha Az Göster',
        copy_to_clipboard: 'Panoya Kopyala',
        copied: 'Kopyalandı!',
        side_panel: {
            view_all_options: 'Tüm Seçenekleri Gör...',
            tables_section: {
                tables: 'Tablolar',
                add_table: 'Tablo Ekle',
                add_view: 'Görünüm Ekle',
                filter: 'Filtrele',
                collapse: 'Hepsini Daralt',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'Tüm tablolar gizli',
                show_all: 'Tümünü göster',

                table: {
                    fields: 'Alanlar',
                    nullable: 'Boş Bırakılabilir?',
                    primary_key: 'Birincil Anahtar',
                    indexes: 'İndeksler',
                    check_constraints: 'Kontrol Kısıtlamaları',
                    comments: 'Yorumlar',
                    no_comments: 'Yorum yok',
                    add_field: 'Alan Ekle',
                    add_index: 'İndeks Ekle',
                    add_check: 'Kontrol Ekle',
                    index_select_fields: 'Alanları Seç',
                    no_types_found: 'Tür bulunamadı',
                    field_name: 'Ad',
                    field_type: 'Tür',
                    field_actions: {
                        title: 'Alan Özellikleri',
                        unique: 'Tekil',
                        auto_increment: 'Otomatik Artış',
                        comments: 'Yorumlar',
                        no_comments: 'Yorum yok',
                        delete_field: 'Alanı Sil',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'Hassasiyet',
                        scale: 'Ölçek',
                    },
                    index_actions: {
                        title: 'İndeks Özellikleri',
                        name: 'Ad',
                        unique: 'Tekil',
                        index_type: 'İndeks Türü',
                        delete_index: 'İndeksi Sil',
                    },
                    check_constraint_actions: {
                        title: 'Kontrol Kısıtlaması',
                        expression: 'İfade',
                        delete: 'Kısıtlamayı Sil',
                    },
                    table_actions: {
                        title: 'Tablo İşlemleri',
                        change_schema: 'Şemayı Değiştir',
                        add_field: 'Alan Ekle',
                        add_index: 'İndeks Ekle',
                        // TODO: Translate
                        duplicate_table: 'Duplicate Table',
                        delete_table: 'Tabloyu Sil',
                    },
                },
                empty_state: {
                    title: 'Tablo yok',
                    description: 'Başlamak için bir tablo oluşturun',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'Filtrele',
                collapse: 'Hepsini Daralt',
                add_relationship: 'İlişki Ekle',
                relationships: 'İlişkiler',
                dependencies: 'Bağımlılıklar',
                relationship: {
                    relationship: 'İlişki',
                    primary: 'Birincil Tablo',
                    foreign: 'İlişkili Tablo',
                    cardinality: 'Kardinalite',
                    delete_relationship: 'Sil',
                    switch_tables: 'Tabloları Değiştir',
                    relationship_actions: {
                        title: 'İşlemler',
                        delete_relationship: 'Sil',
                    },
                },
                dependency: {
                    dependency: 'Bağımlılık',
                    table: 'Tablo',
                    dependent_table: 'Bağımlı Görünüm',
                    delete_dependency: 'Sil',
                    dependency_actions: {
                        title: 'İşlemler',
                        delete_dependency: 'Sil',
                    },
                },
                empty_state: {
                    title: 'İlişki yok',
                    description: 'Başlamak için bir ilişki oluşturun',
                },
            },

            areas_section: {
                areas: 'Alanlar',
                add_area: 'Alan Ekle',
                filter: 'Filtrele',
                clear: 'Filtreyi Temizle',
                no_results: 'Filtrenizle eşleşen alan bulunamadı.',

                area: {
                    area_actions: {
                        title: 'Alan İşlemleri',
                        edit_name: 'Adı Düzenle',
                        delete_area: 'Alanı Sil',
                    },
                },
                empty_state: {
                    title: 'Alan yok',
                    description: 'Başlamak için bir alan oluşturun',
                },
            },

            visuals_section: {
                visuals: 'Görseller',
                tabs: {
                    areas: 'Alanlar',
                    notes: 'Notlar',
                },
            },

            notes_section: {
                filter: 'Filtrele',
                add_note: 'Not Ekle',
                no_results: 'Not bulunamadı',
                clear: 'Filtreyi Temizle',
                empty_state: {
                    title: 'Not Yok',
                    description:
                        'Tuval üzerinde metin açıklamaları eklemek için bir not oluşturun',
                },
                note: {
                    empty_note: 'Boş not',
                    note_actions: {
                        title: 'Not İşlemleri',
                        edit_content: 'İçeriği Düzenle',
                        delete_note: 'Notu Sil',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'Özel Tipler',
                filter: 'Filtrele',
                clear: 'Filtreyi Temizle',
                no_results: 'Filtrenizle eşleşen özel tip bulunamadı.',
                new_type: 'Yeni Tip',
                empty_state: {
                    title: 'Özel tip yok',
                    description:
                        'Veritabanınızda mevcut olduğunda özel tipler burada görünecektir',
                },
                custom_type: {
                    kind: 'Tür',
                    enum_values: 'Enum Değerleri',
                    composite_fields: 'Alanlar',
                    no_fields: 'Alan tanımlanmamış',
                    no_values: 'Tanımlanmış enum değeri yok',
                    field_name_placeholder: 'Alan adı',
                    field_type_placeholder: 'Tip seçin',
                    add_field: 'Alan Ekle',
                    no_fields_tooltip: 'Bu özel tip için alan tanımlanmamış',
                    custom_type_actions: {
                        title: 'İşlemler',
                        highlight_fields: 'Alanları Vurgula',
                        delete_custom_type: 'Sil',
                        clear_field_highlight: 'Vurguyu Kaldır',
                    },
                    delete_custom_type: 'Tipi Sil',
                },
            },
        },
        toolbar: {
            zoom_in: 'Yakınlaştır',
            zoom_out: 'Uzaklaştır',
            save: 'Kaydet',
            show_all: 'Hepsini Gör',
            undo: 'Geri Al',
            redo: 'Yinele',
            reorder_diagram: 'Diyagramı Otomatik Düzenle',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'Çakışan Tabloları Vurgula',
            filter: 'Tabloları Filtrele',
        },
        new_diagram_dialog: {
            database_selection: {
                title: 'Veritabanınız nedir?',
                description:
                    'Her veritabanının kendine özgü özellikleri ve yetenekleri vardır.',
                check_examples_long: 'Örnekleri Kontrol Et',
                check_examples_short: 'Örnekler',
            },
            import_database: {
                title: 'Veritabanını İçe Aktar',
                database_edition: 'Veritabanı Sürümü:',
                step_1: 'Bu komut dosyasını veritabanınızda çalıştırın:',
                step_2: 'Komut dosyası sonucunu buraya yapıştırın →',
                script_results_placeholder: 'Komut dosyası sonuçları burada...',
                ssms_instructions: {
                    button_text: 'SSMS Talimatları',
                    title: 'Talimatlar',
                    step_1: "Araçlar > Seçenekler > Sorgu Sonuçları > SQL Server'a gidin.",
                    step_2: 'Eğer "Sonuçlar Izgaraya" kullanıyorsanız, Maksimum Karakterlerin Alınması için XML olmayan veriler (9999999 olarak ayarlanmış) değiştirin.',
                },
                instructions_link:
                    'Yardıma mı ihtiyacınız var? İzlemek için tıklayın',
                check_script_result: 'Komut Dosyası Sonucunu Kontrol Et',
            },
            // TODO: Translate
            import_from_file: 'Import from File',
            cancel: 'İptal',
            back: 'Geri',
            empty_diagram: 'Boş veritabanı',
            continue: 'Devam',
            import: 'İçe Aktar',
        },
        open_diagram_dialog: {
            title: 'Veritabanı Aç',
            description: 'Aşağıdaki listeden açmak için bir diyagram seçin.',
            table_columns: {
                name: 'Ad',
                created_at: 'Oluşturulma Tarihi',
                last_modified: 'Son Değiştirme',
                tables_count: 'Tablolar',
            },
            cancel: 'İptal',
            open: 'Aç',
            new_database: 'Yeni Veritabanı',

            diagram_actions: {
                open: 'Aç',
                duplicate: 'Kopyala',
                delete: 'Sil',
            },
        },

        export_sql_dialog: {
            title: 'SQL Olarak Dışa Aktar',
            description:
                'Diyagram şemanızı {{databaseType}} betiğine dışa aktarın',
            close: 'Kapat',
            loading: {
                text: 'AI, SQL oluşturuyor {{databaseType}}...',
                description: 'Bu işlem en fazla 30 saniye sürecektir.',
            },
            error: {
                message:
                    'SQL betiği oluşturulurken hata oluştu. Lütfen daha sonra tekrar deneyin veya <0>bize ulaşın</0>.',
                description:
                    "OPENAI_TOKEN'ınızı kullanabilirsiniz, kılavuzu <0>buradan</0> görebilirsiniz.",
            },
        },
        create_relationship_dialog: {
            title: 'İlişki Oluştur',
            primary_table: 'Birincil Tablo',
            primary_field: 'Birincil Alan',
            referenced_table: 'Referans Tablo',
            referenced_field: 'Referans Alan',
            primary_table_placeholder: 'Tablo seç',
            primary_field_placeholder: 'Alan seç',
            referenced_table_placeholder: 'Tablo seç',
            referenced_field_placeholder: 'Alan seç',
            no_tables_found: 'Tablo bulunamadı',
            no_fields_found: 'Alan bulunamadı',
            create: 'Oluştur',
            cancel: 'İptal',
        },
        import_database_dialog: {
            title: 'Mevcut Diyagrama İçe Aktar',
            override_alert: {
                title: 'Veritabanını İçe Aktar',
                content: {
                    alert: 'Bu diyagramı içe aktarmak mevcut tabloları ve ilişkileri etkileyecektir.',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> yeni tablo eklenecek.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> yeni ilişki oluşturulacak.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> tablo üzerine yazılacak.',
                    proceed: 'Devam etmek istiyor musunuz?',
                },
                import: 'İçe Aktar',
                cancel: 'İptal',
            },
        },
        export_image_dialog: {
            title: 'Resmi Dışa Aktar',
            description: 'Dışa aktarım için ölçek faktörünü seçin:',
            scale_1x: '1x (Düşük Kalite)',
            scale_2x: '2x (Normal Kalite)',
            scale_4x: '4x (En İyi Kalite)',
            cancel: 'İptal',
            export: 'Dışa Aktar',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },
        new_table_schema_dialog: {
            title: 'Şema Seç',
            description:
                'Şu anda birden fazla şema görüntülenmektedir. Yeni tablo için birini seçin.',
            cancel: 'İptal',
            confirm: 'Onayla',
        },
        update_table_schema_dialog: {
            title: 'Şemayı Değiştir',
            description: 'Tablo "{{tableName}}" şemasını güncelle',
            cancel: 'İptal',
            confirm: 'Değiştir',
        },

        create_table_schema_dialog: {
            title: 'Yeni Şema Oluştur',
            description:
                'Henüz hiç şema mevcut değil. Tablolarınızı düzenlemek için ilk şemanızı oluşturun.',
            create: 'Oluştur',
            cancel: 'İptal',
        },
        star_us_dialog: {
            title: 'Bize yardım et!',
            description:
                "Bizi GitHub'da yıldızlamak ister misiniz? Sadece bir tık uzakta!",
            close: 'Şimdi Değil',
            confirm: 'Tabii ki!',
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
            one_to_one: 'Bir Bir',
            one_to_many: 'Bir Çok',
            many_to_one: 'Çok Bir',
            many_to_many: 'Çok Çok',
        },
        canvas_context_menu: {
            new_table: 'Yeni Tablo',
            new_view: 'Yeni Görünüm',
            new_relationship: 'Yeni İlişki',
            // TODO: Translate
            new_area: 'Yeni Alan',
            new_note: 'Yeni Not',
        },
        table_node_context_menu: {
            edit_table: 'Tabloyu Düzenle',
            delete_table: 'Tabloyu Sil',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'Tüm tablolar gizli',
            show_all_tables: 'Tümünü göster',
        },

        canvas_filter: {
            title: 'Tabloları Filtrele',
            search_placeholder: 'Tablo ara...',
            group_by_schema: 'Şemaya Göre Grupla',
            group_by_area: 'Alana Göre Grupla',
            no_tables_found: 'Tablo bulunamadı',
            empty_diagram_description: 'Başlamak için bir tablo oluşturun',
            no_tables_description:
                'Aramanızı veya filtrenizi ayarlamayı deneyin',
            clear_filter: 'Filtreyi temizle',
        },

        // TODO: Translate
        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        // TODO: Translate
        tool_tips: {
            double_click_to_edit: 'Double-click to edit',
        },

        language_select: {
            change_language: 'Dil',
        },

        on: 'Açık',
        off: 'Kapalı',
    },
};

export const trMetadata: LanguageMetadata = {
    nativeName: 'Türkçe',
    name: 'Turkish',
    code: 'tr',
};
