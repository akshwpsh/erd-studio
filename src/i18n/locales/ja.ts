import type { LanguageMetadata, LanguageTranslation } from '../types';

export const ja: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: '新規',
            browse: '開く',
            tables: 'テーブル',
            refs: '参照',
            dependencies: '依存関係',
            custom_types: 'カスタムタイプ',
            visuals: 'ビジュアル',
        },
        menu: {
            actions: {
                actions: 'アクション',
                new: '新規...',
                browse: 'すべてのデータベース...',
                save: '保存',
                import: 'データベースをインポート',
                export_sql: 'SQLをエクスポート',
                export_as: '形式を指定してエクスポート',
                delete_diagram: '削除',
            },
            edit: {
                edit: '編集',
                undo: '元に戻す',
                redo: 'やり直し',
                clear: 'クリア',
            },
            view: {
                view: '表示',
                show_sidebar: 'サイドバーを表示',
                hide_sidebar: 'サイドバーを非表示',
                hide_cardinality: 'カーディナリティを非表示',
                show_cardinality: 'カーディナリティを表示',
                hide_field_attributes: 'フィールド属性を非表示',
                show_field_attributes: 'フィールド属性を表示',
                zoom_on_scroll: 'スクロールでズーム',
                show_views: 'データベースビュー',
                theme: 'テーマ',
                // TODO: Translate
                show_dependencies: 'Show Dependencies',
                hide_dependencies: 'Hide Dependencies',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            backup: {
                backup: 'バックアップ',
                export_diagram: 'ダイアグラムをエクスポート',
                restore_diagram: 'ダイアグラムを復元',
            },
            help: {
                help: 'ヘルプ',
                docs_website: 'ドキュメント',
                join_discord: 'Discordに参加',
            },
        },

        profile_dialog: {
            title: 'プロフィール',
            description: 'アカウント設定を表示および更新します。',
            fields: {
                email: 'メール',
                nickname: 'ニックネーム',
                joined: '参加しました',
                profile_image: 'プロフィール画像',
                current_password: '現在のパスワード',
                new_password: '新しいパスワード',
                confirm_new_password: '新しいパスワードを確認してください',
            },
            hints: {
                profile_image: '画像ファイルのみ、最大 5MB。',
            },
            actions: {
                logout: 'ログアウト',
                logging_out: 'サインアウトしています...',
                cancel: 'キャンセル',
                save_changes: '変更を保存',
                saving: '保存中...',
            },
            errors: {
                image_type: '画像ファイルのみ許可されます。',
                image_size: 'プロフィール画像は 5MB 以下である必要があります。',
                nickname_required: 'ニックネームは必須です。',
                current_password_required: '現在のパスワー��が必要です。',
                new_password_required: '新しいパスワードが必要です。',
                new_password_length:
                    '新しいパスワードは 6 文字以上にする必要があります。',
                password_confirmation_mismatch:
                    '新しいパスワードの確認が一致しません。',
                update_failed: 'プロフィールを更新できませんでした。',
                signout_failed: 'サインアウトできませんでした。',
            },
            toasts: {
                password_update_failed: {
                    title: 'パスワードの更新に失敗しました',
                    description_with_error:
                        'プロフィールの変更が保存されました。 {{error}}',
                    description_without_error:
                        'プロファイルの変更は保存されましたが、パスワードの更新に失敗しました。',
                },
                avatar_upload_failed: {
                    title: 'アバターのアップロードに失敗しました',
                    description_fallback:
                        'ニックネームとパスワードの変更はまだ適用されています。',
                },
                profile_updated: {
                    title: 'プロフィールを更新しました',
                    description: 'プロフィールの変更が保存されました。',
                },
            },
        },

        top_nav: {
            share_tooltip: '図を共有',
        },

        share_dialog: {
            title: '図を共有',
            description: '編集者または閲覧者として共同編集者を招待します。',
            access: {
                title: 'あなたのアクセス',
                readonly_hint:
                    'メンバーと招待状を管理できるのはオーナーだけです。',
            },
            roles: {
                owner: 'オーナー',
                editor: '編集者',
                viewer: '閲覧者',
            },
            status: {
                pending: '保留中',
                accepted: '承認されました',
                revoked: '取り消されました',
                expired: '期限切れ',
            },
            invite: {
                section_title: 'メールで招待',
                email_placeholder: 'チームメイト@example.com',
            },
            members: {
                section_title: 'メンバー',
                empty: '招待されたメンバーはまだいません。',
            },
            invitations: {
                section_title: '保留中の招待状',
                empty: '保留中の招待はありません。',
            },
            history: {
                section_title: '招待履歴',
                empty: '招待状はまだありません。',
            },
            actions: {
                invite: '招待',
                remove: '削除',
                revoke: '取り消し',
                copy_link: 'リンクをコピー',
                refresh: '更新',
                close: '閉じる',
            },
            labels: {
                your_access: 'あなたのアクセス:',
                expires: '有効期限が切れます',
                updated: '更新しました',
            },
            toasts: {
                invite_created: {
                    title: '招待状が作成されました',
                    description: '{{email}} が {{role}} として招待されました。',
                },
                invite_failed: {
                    title: '招待に失敗しました',
                },
                role_update_failed: {
                    title: 'ロールの更新に失敗しました',
                },
                remove_failed: {
                    title: 'メンバーの削除に失敗しました',
                },
                revoke_failed: {
                    title: '招待を取り消すことができませんでした',
                },
                copy_success: {
                    title: '招待リンクをコピーしました',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'コピーに失敗しました',
                    description: '招待リンクをコピーできませんでした。',
                },
            },
            errors: {
                email_required: 'メールアドレスは必須です。',
                unknown_error: '不明なエラーです。',
                no_diagram_selected: '図が選択されていません。',
            },
        },

        auth_gate: {
            title: 'ERDS にサインインします',
            subtitle: '図は Supabase アカウントに保存されます。',
            tabs: {
                sign_in: 'サインイン',
                sign_up: 'サインアップ',
            },
            placeholders: {
                nickname: 'ニックネーム',
                email: 'you@example.com',
                password: 'パスワード',
                confirm_password: 'パスワードを確認してください',
            },
            actions: {
                sign_in: 'サインイン',
                signing_in: 'サインイン中...',
                create_account: 'アカウントを作成する',
                creating_account: 'アカウントを作成中...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase が設定されていません',
                supabase_not_configured_description:
                    'SUPABASE_URL および SUPABASE_PUBLISHABLE_DEFAULT_KEY 環境変数を追加して続行します。',
                success_title: '成功',
                authentication_failed_title: '認証に失敗しました',
            },
            validation: {
                email_and_password_required:
                    'メールアドレスとパスワードが必要です。',
                nickname_required: 'ニックネームは必須です。',
                email_required: 'メールアドレスは必須です。',
                password_required: 'パスワードが必要です。',
                password_min_length:
                    'パスワードは 6 文字以上である必要があります。',
                password_confirmation_mismatch:
                    'パスワード確認が一致しません。',
                sign_in_failed: 'サインインに失敗しました。',
                create_account_failed: 'アカウントの作成に失敗しました。',
            },
            success: {
                account_created:
                    'アカウントが作成されました。電子メール確認が有効になっている場合は、サインインする前に受信トレイを確認してください。',
            },
        },

        invite_accept_page: {
            loading: '招待を受け入れます...',
            error_title: '招待を受け入れることができませんでした',
            actions: {
                retry: '再試行',
                go_to_app: 'アプリに移動',
            },
            errors: {
                expired: 'この招待リンクの有効期限が切れています。',
                mismatch:
                    'この招待状は別の電子メール アカウントに送信されました。',
                revoked: 'この招待は取り消されました。',
                not_pending: 'この招待状は現在無効になっています。',
                not_found: '招待状が見つかりません。',
                token_missing: '招待トークンがありません。',
                supabase_not_configured: 'Supabase が設定されていません。',
                accept_failed: '招待を受け入れることができませんでした。',
                unknown_error: '不明なエラーです。',
                no_diagram_returned:
                    '招待は受け入れられましたが、図は返されませんでした。',
                invitee_email_required: '招待者のメールアドレスは必須です。',
            },
        },

        collab_presence: {
            online_count: '{{count}} オンライン',
            role: {
                owner: 'オーナー',
                editor: '編集者',
                viewer: '閲覧者',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'クラウド同期が復元されました',
            restored_description: '変更は再び Supabase に同期されます。',
            paused_title: 'クラウド同期が一時停止されました',
            paused_description:
                'ローカルでの変更は安全であり、自動的に再試行されます。',
            read_only_title: '読み取り専用アクセス',
            read_only_description:
                'この共有図は表示できますが、変更を保存することはできません。',
            access_removed_title: 'アクセスが削除されました',
            access_removed_description:
                'この共有図へのアクセス権が削除されました。',
        },

        collaboration_errors: {
            expired: 'この招待リンクの有効期限が切れています。',
            mismatch: 'この招待状は別の電子メール アカウントに送信されました。',
            revoked: 'この招待は取り消されました。',
            not_pending: 'この招待状は現在無効になっています。',
            not_found: '招待状が見つかりません。',
            invitee_email_required: '招待者のメールアドレスは必須です。',
            token_missing: '招待トークンが必要です。',
            supabase_not_configured: 'Supabase が設定されていません。',
        },

        delete_diagram_alert: {
            title: 'ダイアグラムを削除',
            description:
                'この操作は元に戻せません。これによりダイアグラムが永久に削除されます。',
            cancel: 'キャンセル',
            delete: '削除',
        },

        clear_diagram_alert: {
            title: 'ダイアグラムをクリア',
            description:
                'この操作は元に戻せません。これによりダイアグラム内のすべてのデータが永久に削除されます。',
            cancel: 'キャンセル',
            clear: 'クリア',
        },

        reorder_diagram_alert: {
            title: 'ダイアグラムを自動配置',
            description:
                'この操作によりダイアグラム内のすべてのテーブルが再配置されます。続行しますか？',
            reorder: '自動配置',
            cancel: 'キャンセル',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'コピー失敗',
                description: 'クリップボードがサポートされていません',
            },
            failed: {
                title: 'コピー失敗',
                description:
                    '何かがうまくいきませんでした。もう一度お試しください。',
            },
        },

        theme: {
            system: 'システム',
            light: 'ライト',
            dark: 'ダーク',
        },

        zoom: {
            on: 'オン',
            off: 'オフ',
        },

        last_saved: '最後に保存された',
        saved: '保存されました',
        loading_diagram: 'ダイアグラムを読み込み中...',
        deselect_all: 'すべての選択を解除',
        select_all: 'すべてを選択',
        clear: 'クリア',
        show_more: 'さらに表示',
        show_less: '表示を減らす',
        // TODO: Translate
        copy_to_clipboard: 'Copy to Clipboard',
        copied: 'Copied!',

        side_panel: {
            view_all_options: 'すべてのオプションを表示...',
            tables_section: {
                tables: 'テーブル',
                add_table: 'テーブルを追加',
                add_view: 'ビューを追加',
                filter: 'フィルタ',
                collapse: 'すべて折りたたむ',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: 'すべてのテーブルが非表示です',
                show_all: 'すべて表示',

                table: {
                    fields: 'フィールド',
                    nullable: 'NULL可能?',
                    primary_key: '主キー',
                    indexes: 'インデックス',
                    check_constraints: 'チェック制約',
                    comments: 'コメント',
                    no_comments: 'コメントがありません',
                    add_field: 'フィールドを追加',
                    add_index: 'インデックスを追加',
                    add_check: 'チェックを追加',
                    index_select_fields: 'フィールドを選択',
                    no_types_found: 'タイプが見つかりません',
                    field_name: '名前',
                    field_type: 'タイプ',
                    field_actions: {
                        title: 'フィールド属性',
                        unique: 'ユニーク',
                        auto_increment: 'オートインクリメント',
                        comments: 'コメント',
                        no_comments: 'コメントがありません',
                        delete_field: 'フィールドを削除',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: '精度',
                        scale: '小数点以下桁数',
                    },
                    index_actions: {
                        title: 'インデックス属性',
                        name: '名前',
                        unique: 'ユニーク',
                        index_type: 'インデックスタイプ',
                        delete_index: 'インデックスを削除',
                    },
                    check_constraint_actions: {
                        title: 'チェック制約',
                        expression: '式',
                        delete: 'チェック制約を削除',
                    },
                    table_actions: {
                        title: 'テーブル操作',
                        change_schema: 'スキーマを変更',
                        add_field: 'フィールドを追加',
                        add_index: 'インデックスを追加',
                        duplicate_table: 'Duplicate Table', // TODO: Translate
                        delete_table: 'テーブルを削除',
                    },
                },
                empty_state: {
                    title: 'テーブルがありません',
                    description: 'テーブルを作成して開始してください',
                },
            },
            refs_section: {
                refs: '参照',
                filter: 'フィルタ',
                collapse: 'すべて折りたたむ',
                add_relationship: 'リレーションシップを追加',
                relationships: 'リレーションシップ',
                dependencies: '依存関係',
                relationship: {
                    relationship: 'リレーションシップ',
                    primary: '主テーブル',
                    foreign: '関連テーブル',
                    cardinality: 'カーディナリティ',
                    delete_relationship: '削除',
                    switch_tables: 'テーブルを入れ替え',
                    relationship_actions: {
                        title: '操作',
                        delete_relationship: '削除',
                    },
                },
                dependency: {
                    dependency: '依存関係',
                    table: 'テーブル',
                    dependent_table: '依存ビュー',
                    delete_dependency: '削除',
                    dependency_actions: {
                        title: '操作',
                        delete_dependency: '削除',
                    },
                },
                empty_state: {
                    title: 'リレーションシップがありません',
                    description:
                        '開始するためにリレーションシップを作成してください',
                },
            },

            areas_section: {
                areas: 'エリア',
                add_area: 'エリアを追加',
                filter: 'フィルタ',
                clear: 'フィルタをクリア',
                no_results: 'フィルタに一致するエリアが見つかりません。',

                area: {
                    area_actions: {
                        title: 'エリア操作',
                        edit_name: '名前を編集',
                        delete_area: 'エリアを削除',
                    },
                },
                empty_state: {
                    title: 'エリアがありません',
                    description: 'エリアを作成して開始してください',
                },
            },

            visuals_section: {
                visuals: 'ビジュアル',
                tabs: {
                    areas: 'エリア',
                    notes: 'ノート',
                },
            },

            notes_section: {
                filter: 'フィルター',
                add_note: 'ノートを追加',
                no_results: 'ノートが見つかりません',
                clear: 'フィルターをクリア',
                empty_state: {
                    title: 'ノートがありません',
                    description:
                        'キャンバス上にテキスト注釈を追加するためのノートを作成',
                },
                note: {
                    empty_note: '空のノート',
                    note_actions: {
                        title: 'ノートアクション',
                        edit_content: 'コンテンツを編集',
                        delete_note: 'ノートを削除',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'カスタム型',
                filter: 'フィルタ',
                clear: 'フィルタをクリア',
                no_results: 'フィルタに一致するカスタム型が見つかりません。',
                new_type: '新しい型',
                empty_state: {
                    title: 'カスタム型がありません',
                    description:
                        'データベースで利用可能になると、カスタム型がここに表示されます',
                },
                custom_type: {
                    kind: '種類',
                    enum_values: '列挙値',
                    composite_fields: 'フィールド',
                    no_fields: 'フィールドが定義されていません',
                    no_values: '列挙値が定義されていません',
                    field_name_placeholder: 'フィールド名',
                    field_type_placeholder: '型を選択',
                    add_field: 'フィールドを追加',
                    no_fields_tooltip:
                        'このカスタム型にはフィールドが定義されていません',
                    custom_type_actions: {
                        title: '操作',
                        highlight_fields: 'フィールドをハイライト',
                        delete_custom_type: '削除',
                        clear_field_highlight: 'ハイライトを解除',
                    },
                    delete_custom_type: '型を削除',
                },
            },
        },

        toolbar: {
            zoom_in: 'ズームイン',
            zoom_out: 'ズームアウト',
            save: '保存',
            show_all: 'すべて表示',
            undo: '元に戻す',
            redo: 'やり直し',
            reorder_diagram: 'ダイアグラムを自動配置',
            // TODO: Translate
            highlight_overlapping_tables: 'Highlight Overlapping Tables',
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                '「{{typeName}}」をハイライト中 - クリックで解除',
            filter: 'テーブルをフィルタ',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'データベースは何ですか？',
                description: '各データベースには独自の機能と能力があります。',
                check_examples_long: '例を確認',
                check_examples_short: '例',
            },

            import_database: {
                title: 'データベースをインポート',
                database_edition: 'データベースエディション:',
                step_1: 'このスクリプトをデータベースで実行してください:',
                step_2: 'ここにスクリプトの結果を貼り付けてください →',
                script_results_placeholder: 'ここにスクリプトの結果...',
                ssms_instructions: {
                    button_text: 'SSMSの手順',
                    title: '手順',
                    step_1: 'ツール > オプション > クエリ結果 > SQL Serverに移動します。',
                    step_2: '「グリッドへの結果」を使用している場合、XML以外のデータの最大取得文字数を変更してください（9999999に設定）。',
                },
                // TODO: Translate
                instructions_link: 'Need help? Watch how',
                check_script_result: 'Check Script Result',
            },

            cancel: 'キャンセル',
            back: '戻る',
            // TODO: Translate
            import_from_file: 'Import from File',
            empty_diagram: '空のデータベース',
            continue: '続行',
            import: 'インポート',
        },

        open_diagram_dialog: {
            title: 'データベースを開く',
            description: '以下のリストからダイアグラムを選択してください。',
            table_columns: {
                name: '名前',
                created_at: '作成日',
                last_modified: '最終更新日',
                tables_count: 'テーブル数',
            },
            cancel: 'キャンセル',
            open: '開く',
            new_database: '新しいデータベース',

            diagram_actions: {
                open: '開く',
                duplicate: '複製',
                delete: '削除',
            },
        },

        export_sql_dialog: {
            title: 'SQLをエクスポート',
            description:
                'ダイアグラムスキーマを{{databaseType}}スクリプトにエクスポート',
            close: '閉じる',
            loading: {
                text: 'AIが{{databaseType}}のSQLを生成中...',
                description: 'これには最大30秒かかります。',
            },
            error: {
                message:
                    'SQLスクリプトの生成中にエラーが発生しました。後でもう一度試すか、<0>お問い合わせください</0>。',
                description:
                    'OPENAI_TOKENを自由に使用して、マニュアルを<0>こちら</0>で確認してください。',
            },
        },

        create_relationship_dialog: {
            title: 'リレーションシップを作成',
            primary_table: '主テーブル',
            primary_field: '主フィールド',
            referenced_table: '参照テーブル',
            referenced_field: '参照フィールド',
            primary_table_placeholder: 'テーブルを選択',
            primary_field_placeholder: 'フィールドを選択',
            referenced_table_placeholder: 'テーブルを選択',
            referenced_field_placeholder: 'フィールドを選択',
            no_tables_found: 'テーブルが見つかりません',
            no_fields_found: 'フィールドが見つかりません',
            create: '作成',
            cancel: 'キャンセル',
        },

        import_database_dialog: {
            title: '現在のダイアグラムにインポート',
            override_alert: {
                title: 'データベースをインポート',
                content: {
                    alert: 'このダイアグラムをインポートすると、既存のテーブルおよびリレーションシップに影響を与えます。',
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> 新しいテーブルが追加されます。',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> 新しいリレーションシップが作成されます。',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> テーブルが上書きされます。',
                    proceed: '続行しますか？',
                },
                import: 'インポート',
                cancel: 'キャンセル',
            },
        },

        export_image_dialog: {
            title: '画像をエクスポート',
            description: 'エクスポートの倍率を選択してください:',
            scale_1x: '1x (低画質)',
            scale_2x: '2x (通常画質)',
            scale_4x: '4x (最高画質)',
            cancel: 'キャンセル',
            export: 'エクスポート',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'スキーマを選択',
            description:
                '現在、複数のスキーマが表示されています。新しいテーブル用に1つを選択してください。',
            cancel: 'キャンセル',
            confirm: '確認',
        },

        update_table_schema_dialog: {
            title: 'スキーマを変更',
            description: 'テーブル「{{tableName}}」のスキーマを更新',
            cancel: 'キャンセル',
            confirm: '変更',
        },

        create_table_schema_dialog: {
            title: '新しいスキーマを作成',
            description:
                'スキーマがまだ存在しません。テーブルを整理するために最初のスキーマを作成してください。',
            create: '作成',
            cancel: 'キャンセル',
        },

        star_us_dialog: {
            title: '改善をサポートしてください！',
            description:
                'GitHubでスターを付けていただけますか？ クリックするだけです！',
            close: '今はしない',
            confirm: 'もちろん！',
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
            one_to_one: '1対1',
            one_to_many: '1対多',
            many_to_one: '多対1',
            many_to_many: '多対多',
        },

        canvas_context_menu: {
            new_table: '新しいテーブル',
            new_view: '新しいビュー',
            new_relationship: '新しいリレーションシップ',
            new_area: '新しいエリア',
            new_note: '新しいメモ',
        },

        table_node_context_menu: {
            edit_table: 'テーブルを編集',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            delete_table: 'テーブルを削除',
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: 'すべてのテーブルが非表示です',
            show_all_tables: 'すべて表示',
        },

        canvas_filter: {
            title: 'テーブルをフィルター',
            search_placeholder: 'テーブルを検索...',
            group_by_schema: 'スキーマでグループ化',
            group_by_area: 'エリアでグループ化',
            no_tables_found: 'テーブルが見つかりません',
            empty_diagram_description: 'テーブルを作成して開始',
            no_tables_description: '検索またはフィルターを調整してください',
            clear_filter: 'フィルターをクリア',
        },

        // TODO: Add translations
        snap_to_grid_tooltip: 'Snap to Grid (Hold {{key}})',

        tool_tips: {
            double_click_to_edit: 'ダブルクリックして編集',
        },

        language_select: {
            change_language: '言語',
        },

        on: 'オン',
        off: 'オフ',
    },
};

export const jaMetadata: LanguageMetadata = {
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja',
};
