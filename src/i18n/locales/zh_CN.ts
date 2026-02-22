import type { LanguageMetadata, LanguageTranslation } from '../types';

export const zh_CN: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: '新建',
            browse: '打开',
            tables: '表',
            refs: '引用',
            dependencies: '依赖关系',
            custom_types: '自定义类型',
            visuals: '视觉效果',
        },
        menu: {
            actions: {
                actions: '操作',
                new: '新建...',
                browse: '所有数据库...',
                save: '保存',
                import: '导入数据库',
                export_sql: '导出 SQL 语句',
                export_as: '导出为',
                delete_diagram: '删除',
            },
            edit: {
                edit: '编辑',
                undo: '撤销',
                redo: '重做',
                clear: '清空',
            },
            view: {
                view: '视图',
                show_sidebar: '展示侧边栏',
                hide_sidebar: '隐藏侧边栏',
                hide_cardinality: '隐藏基数',
                show_cardinality: '展示基数',
                show_field_attributes: '展示字段属性',
                hide_field_attributes: '隐藏字段属性',
                zoom_on_scroll: '滚动缩放',
                show_views: '数据库视图',
                theme: '主题',
                show_dependencies: '展示依赖',
                hide_dependencies: '隐藏依赖',
                // TODO: Translate
                show_minimap: 'Show Mini Map',
                hide_minimap: 'Hide Mini Map',
            },
            backup: {
                backup: '备份',
                export_diagram: '导出关系图',
                restore_diagram: '还原图表',
            },
            help: {
                help: '帮助',
                docs_website: '文档',
                join_discord: '在 Discord 上加入我们',
            },
        },

        profile_dialog: {
            title: '个人资料',
            description: '查看和更新您的帐户设置。',
            fields: {
                email: '电子邮件',
                nickname: '昵称',
                joined: '已加入',
                profile_image: '个人资料图片',
                current_password: '当前密码',
                new_password: '新密码',
                confirm_new_password: '确认新密码',
            },
            hints: {
                profile_image: '仅图像文件，最多 5MB。',
            },
            actions: {
                logout: '退出',
                logging_out: '正在退出...',
                cancel: '取消',
                save_changes: '保存更改',
                saving: '正在保存...',
            },
            errors: {
                image_type: '只允许使用图像文件。',
                image_size: '个人资料图片必须为 5MB 或更小。',
                nickname_required: '需要昵称。',
                current_password_required: '需要当前密码。',
                new_password_required: '需要新密码。',
                new_password_length: '新密码必须至少有 6 个字符。',
                password_confirmation_mismatch: '新密码确认不匹配。',
                update_failed: '更新个人资料失败。',
                signout_failed: '退出失败。',
            },
            toasts: {
                password_update_failed: {
                    title: '密码更新失败',
                    description_with_error: '配置文件更改已保存。 {{error}}',
                    description_without_error:
                        '配置文件更改已保存，但密码更新失败。',
                },
                avatar_upload_failed: {
                    title: '头像上传失败',
                    description_fallback: '昵称和密码更改仍然适用。',
                },
                profile_updated: {
                    title: '个人资料已更新',
                    description: '您的个人资料更改已保存。',
                },
            },
        },

        top_nav: {
            share_tooltip: '分享图',
        },

        share_dialog: {
            title: '分享图',
            description: '邀请合作者作为编辑或查看者。',
            access: {
                title: '您的访问权限',
                readonly_hint: '只有所有者可以管理成员和邀请。',
            },
            roles: {
                owner: '楼主',
                editor: '编辑',
                viewer: '观众',
            },
            status: {
                pending: '待处理',
                accepted: '已接受',
                revoked: '已撤销',
                expired: '已过期',
            },
            invite: {
                section_title: '通过电子邮件邀请',
                email_placeholder: 'teammate@example.com',
            },
            members: {
                section_title: '会员',
                empty: '还没有受邀请的成员。',
            },
            invitations: {
                section_title: '待处理的邀请',
                empty: '没有待处理的��请。',
            },
            history: {
                section_title: '邀请历史',
                empty: '还没有邀请。',
            },
            actions: {
                invite: '邀请',
                remove: '删除',
                revoke: '撤销',
                copy_link: '复制链接',
                refresh: '刷新',
                close: '关闭',
            },
            labels: {
                your_access: '您的访问权限：',
                expires: '过期',
                updated: '已更新',
            },
            toasts: {
                invite_created: {
                    title: '已创建邀请',
                    description: '{{email}} 被邀请作为 {{role}}。',
                },
                invite_failed: {
                    title: '邀请失败',
                },
                role_update_failed: {
                    title: '角色更新失败',
                },
                remove_failed: {
                    title: '删除成员失败',
                },
                revoke_failed: {
                    title: '撤销邀请失败',
                },
                copy_success: {
                    title: '已复制邀请链接',
                    description: '{{url}}',
                },
                copy_failed: {
                    title: '复制失败',
                    description: '无法复制邀请链接。',
                },
            },
            errors: {
                email_required: '电子邮件为必填项。',
                unknown_error: '未知错误。',
                no_diagram_selected: '未选择图表。',
            },
        },

        auth_gate: {
            title: '登录 ERDS',
            subtitle: '您的图表存储在您的 Supabase 帐户中。',
            tabs: {
                sign_in: '登录',
                sign_up: '注册',
            },
            placeholders: {
                nickname: '昵称',
                email: 'you@example.com',
                password: '密码',
                confirm_password: '确认密码',
            },
            actions: {
                sign_in: '登录',
                signing_in: '正在登录...',
                create_account: '创建帐户',
                creating_account: '正在创建帐户...',
            },
            alerts: {
                supabase_not_configured_title: 'Supabase 未配置',
                supabase_not_configured_description:
                    '添加 SUPABASE_URL 和 SUPABASE_PUBLISHABLE_DEFAULT_KEY 环境变量以继续。',
                success_title: '成功',
                authentication_failed_title: '验证失败',
            },
            validation: {
                email_and_password_required: '需要电子邮件和密码。',
                nickname_required: '需要昵称。',
                email_required: '电子邮件为必填项。',
                password_required: '需要密码。',
                password_min_length: '密码必须至少为 6 个字符。',
                password_confirmation_mismatch: '密码确认不匹配。',
                sign_in_failed: '登录失败。',
                create_account_failed: '创建帐户失败。',
            },
            success: {
                account_created:
                    '帐户已创建。如果启用了电子邮件确认，请在登录前检查您的收件箱。',
            },
        },

        invite_accept_page: {
            loading: '接受邀请...',
            error_title: '邀请无法被接受',
            actions: {
                retry: '重试',
                go_to_app: '前往应用程序',
            },
            errors: {
                expired: '此邀请链接已过期。',
                mismatch: '此邀请已发送到其他电子邮件帐户。',
                revoked: '该邀请已被撤销���',
                not_pending: '此邀请不再有效。',
                not_found: '未找到邀请。',
                token_missing: '邀请令牌丢失。',
                supabase_not_configured: 'Supabase 未配置。',
                accept_failed: '无法接受邀请。',
                unknown_error: '未知错误。',
                no_diagram_returned: '已接受邀请，但没有返回图表。',
                invitee_email_required: '受邀者电子邮件为必填项。',
            },
        },

        collab_presence: {
            online_count: '{{count}} 在线',
            role: {
                owner: '楼主',
                editor: '编辑',
                viewer: '观众',
            },
        },

        cloud_sync_toasts: {
            restored_title: '云同步已恢复',
            restored_description: '更改再次同步到 Supabase。',
            paused_title: '云同步已暂停',
            paused_description: '您的本地更改是安全的，并且会自动重试。',
            read_only_title: '只读访问',
            read_only_description: '您可以查看此共享图表，但无法保存更改。',
            access_removed_title: '访问权限已删除',
            access_removed_description: '您对此共享图表的访问权限已被删除。',
        },

        collaboration_errors: {
            expired: '此邀请链接已过期。',
            mismatch: '此邀请已发送到其他电子邮件帐户。',
            revoked: '该邀请已被撤销���',
            not_pending: '此邀请不再有效。',
            not_found: '未找到邀请。',
            invitee_email_required: '受邀者电子邮件为必填项。',
            token_missing: '需要邀请令牌。',
            supabase_not_configured: 'Supabase 未配置。',
        },

        delete_diagram_alert: {
            title: '删除关系图',
            description: '此操作无法撤销。这将永久删除关系图。',
            cancel: '取消',
            delete: '删除',
        },

        clear_diagram_alert: {
            title: '清除关系图',
            description: '此操作无法撤销。这将永久删除关系图中的所有数据。',
            cancel: '取消',
            clear: '清空',
        },

        reorder_diagram_alert: {
            title: '自动排列关系图',
            description: '此操作将重新排列关系图中的所有表。是否要继续？',
            reorder: '自动排列',
            cancel: '取消',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: '复制失败',
                description: '不支持剪贴板',
            },
            failed: {
                title: '复制失败',
                description: '出现问题。请再试一次。',
            },
        },

        theme: {
            system: '系统',
            light: '浅色',
            dark: '深色',
        },

        zoom: {
            on: '启用',
            off: '禁用',
        },

        last_saved: '上次保存时间：',
        saved: '已保存',
        loading_diagram: '加载关系图...',
        deselect_all: '取消全选',
        select_all: '全选',
        clear: '清空',
        show_more: '展开',
        show_less: '收起',
        copy_to_clipboard: '复制到剪切板',
        copied: '复制了！',

        side_panel: {
            view_all_options: '查看所有选项...',
            tables_section: {
                tables: '表',
                add_table: '添加表',
                add_view: '添加视图',
                filter: '筛选',
                collapse: '全部折叠',
                // TODO: Translate
                clear: 'Clear Filter',
                no_results: 'No tables found matching your filter.',
                // TODO: Translate
                show_list: 'Show Table List',
                show_dbml: 'Show DBML Editor',
                all_hidden: '所有表格已隐藏',
                show_all: '显示全部',

                table: {
                    fields: '字段',
                    nullable: '可为空？',
                    primary_key: '主键',
                    indexes: '索引',
                    check_constraints: '检查约束',
                    comments: '注释',
                    no_comments: '空',
                    add_field: '添加字段',
                    add_index: '添加索引',
                    add_check: '添加检查',
                    index_select_fields: '选择字段',
                    no_types_found: '未找到类型',
                    field_name: '名称',
                    field_type: '类型',
                    field_actions: {
                        title: '字段属性',
                        unique: '唯一',
                        auto_increment: '自动递增',
                        comments: '注释',
                        no_comments: '空',
                        delete_field: '删除字段',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: '精度',
                        scale: '小数位',
                    },
                    index_actions: {
                        title: '索引属性',
                        name: '名称',
                        unique: '唯一',
                        index_type: '索引类型',
                        delete_index: '删除索引',
                    },
                    check_constraint_actions: {
                        title: '检查约束',
                        expression: '表达式',
                        delete: '删除检查约束',
                    },
                    table_actions: {
                        title: '表操作',
                        change_schema: '更改模式',
                        add_field: '添加字段',
                        add_index: '添加索引',
                        duplicate_table: 'Duplicate Table', // TODO: Translate
                        delete_table: '删除表',
                    },
                },
                empty_state: {
                    title: '没有表',
                    description: '新建表以开始',
                },
            },
            refs_section: {
                refs: '引用',
                filter: '筛选',
                collapse: '全部折叠',
                add_relationship: '添加关系',
                relationships: '关系',
                dependencies: '依赖关系',
                relationship: {
                    relationship: '关系',
                    primary: '主表',
                    foreign: '关联表',
                    cardinality: '基数',
                    delete_relationship: '删除',
                    switch_tables: '切换表',
                    relationship_actions: {
                        title: '操作',
                        delete_relationship: '删除',
                    },
                },
                dependency: {
                    dependency: '依赖',
                    table: '表',
                    dependent_table: '依赖视图',
                    delete_dependency: '删除',
                    dependency_actions: {
                        title: '操作',
                        delete_dependency: '删除',
                    },
                },
                empty_state: {
                    title: '无关系',
                    description: '创建关系以开始',
                },
            },

            areas_section: {
                areas: '区域',
                add_area: '添加区域',
                filter: '筛选',
                clear: '清除筛选',
                no_results: '未找到符合筛选条件的区域。',

                area: {
                    area_actions: {
                        title: '区域操作',
                        edit_name: '编辑名称',
                        delete_area: '删除区域',
                    },
                },
                empty_state: {
                    title: '没有区域',
                    description: '创建区域以开始',
                },
            },

            visuals_section: {
                visuals: '视觉效果',
                tabs: {
                    areas: '区域',
                    notes: '笔记',
                },
            },

            notes_section: {
                filter: '筛选',
                add_note: '添加笔记',
                no_results: '未找到笔记',
                clear: '清除筛选',
                empty_state: {
                    title: '没有笔记',
                    description: '创建笔记以在画布上添加文本注释',
                },
                note: {
                    empty_note: '空笔记',
                    note_actions: {
                        title: '笔记操作',
                        edit_content: '编辑内容',
                        delete_note: '删除笔记',
                    },
                },
            },

            custom_types_section: {
                custom_types: '自定义类型',
                filter: '筛选',
                clear: '清除筛选',
                no_results: '未找到符合筛选条件的自定义类型。',
                new_type: '新类型',
                empty_state: {
                    title: '没有自定义类型',
                    description:
                        '当数据库中有可用的自定义类型时，它们将显示在这里',
                },
                custom_type: {
                    kind: '类型',
                    enum_values: '枚举值',
                    composite_fields: '字段',
                    no_fields: '未定义字段',
                    no_values: '没有定义枚举值',
                    field_name_placeholder: '字段名称',
                    field_type_placeholder: '选择类型',
                    add_field: '添加字段',
                    no_fields_tooltip: '此自定义类型未定义字段',
                    custom_type_actions: {
                        title: '操作',
                        highlight_fields: '高亮字段',
                        delete_custom_type: '删除',
                        clear_field_highlight: '清除高亮',
                    },
                    delete_custom_type: '删除类型',
                },
            },
        },

        toolbar: {
            zoom_in: '放大',
            zoom_out: '缩小',
            save: '保存',
            show_all: '展示全部',
            undo: '撤销',
            redo: '重做',
            reorder_diagram: '自动排列关系图',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: '突出显示重叠的表',
            filter: '筛选表',
        },

        new_diagram_dialog: {
            database_selection: {
                title: '您是哪种数据库？',
                description: '每种数据库都有其特性和功能。',
                check_examples_long: '查看样例',
                check_examples_short: '样例',
            },

            import_database: {
                title: '导入您的数据库',
                database_edition: '数据库类型：',
                step_1: '在您的数据库中执行以下脚本：',
                step_2: '将结果粘贴于此 →',
                script_results_placeholder: '结果...',
                ssms_instructions: {
                    button_text: 'SSMS 说明',
                    title: '说明',
                    step_1: '前往 工具 > 选项 > 查询结果 > SQL Server。',
                    // TODO: Add translations
                    step_2: '如果您使用“Result to Grid”功能，请将非 XML 数据的最大提取字符数更改为 9999999。',
                },
                instructions_link: '需要帮助？看看如何操作',
                check_script_result: '检查脚本结果',
            },

            cancel: '取消',
            import_from_file: '从文件导入',
            back: '上一步',
            empty_diagram: '空数据库',
            continue: '下一步',
            import: '导入',
        },

        open_diagram_dialog: {
            title: '打开数据库',
            description: '从下面的列表中选择一个图表打开。',
            table_columns: {
                name: '名称',
                created_at: '创建于',
                last_modified: '最后修改于',
                tables_count: '表数量',
            },
            cancel: '取消',
            open: '打开',
            new_database: '新建数据库',

            diagram_actions: {
                open: '打开',
                duplicate: '复制',
                delete: '删除',
            },
        },

        export_sql_dialog: {
            title: '导出 SQL 语句',
            description: '将您的图表模式导出为 {{databaseType}} 脚本。',
            close: '关闭',
            loading: {
                text: 'AI 正在为 {{databaseType}} 生成 SQL 语句...',
                description: '此操作最多需要 30 秒。',
            },
            error: {
                message:
                    '生成 SQL 脚本时出错。请稍后再试，或者 <0>联系我们</0>。',
                description:
                    '随时使用您的 OPENAI_TOKEN，在<0>这里</0>查看手册。',
            },
        },

        create_relationship_dialog: {
            title: '创建关系',
            primary_table: '主表',
            primary_field: '主键字段',
            referenced_table: '被引用表',
            referenced_field: '被引用字段',
            primary_table_placeholder: '选择表',
            primary_field_placeholder: '选择字段',
            referenced_table_placeholder: '选择表',
            referenced_field_placeholder: '选择字段',
            no_tables_found: '未找到表',
            no_fields_found: '未找到字段',
            create: '创建',
            cancel: '取消',
        },

        import_database_dialog: {
            title: '导入到当前关系图',
            override_alert: {
                title: '导入数据库',
                content: {
                    alert: '导入此关系图将影响现有的表和关系。',
                    new_tables:
                        '将添加 <bold>{{newTablesNumber}}</bold> 个新表。',
                    new_relationships:
                        '将创建 <bold>{{newRelationshipsNumber}}</bold> 个新关系。',
                    tables_override:
                        '将覆盖 <bold>{{tablesOverrideNumber}}</bold> 个表。',
                    proceed: '您是否要继续操作？',
                },
                import: '导入',
                cancel: '取消',
            },
        },

        export_image_dialog: {
            title: '导出图片',
            description: '选择导出的缩放比例：',
            scale_1x: '1x (低质量)',
            scale_2x: '2x (普通质量)',
            scale_4x: '4x (最佳质量)',
            cancel: '取消',
            export: '导出',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: '选择模式',
            description: '当前显示多个模式。请选择一个用于新表。',
            cancel: '取消',
            confirm: '确认',
        },

        update_table_schema_dialog: {
            title: '更改模式',
            description: '更新表 "{{tableName}}" 的模式。',
            cancel: '取消',
            confirm: '更改',
        },

        create_table_schema_dialog: {
            title: '创建新模式',
            description: '尚未存在任何模式。创建您的第一个模式来组织您的表。',
            create: '创建',
            cancel: '取消',
        },

        star_us_dialog: {
            title: '帮助我们改进！',
            description: '您想在 GitHub 上为我们加注星标吗？只需点击一下即可！',
            close: '以后再说',
            confirm: '当然！',
        },
        export_diagram_dialog: {
            title: '导出关系图',
            description: '选择导出格式：',
            format_json: 'JSON',
            cancel: '取消',
            export: '导出',
            // TODO: translate
            error: {
                title: 'Error exporting diagram',
                description:
                    'Something went wrong. Need help? support@chartdb.io',
            },
        },

        import_diagram_dialog: {
            title: '导入关系图',
            description: '在下方粘贴关系图的 JSON：',
            cancel: '取消',
            import: '导入',
            error: {
                title: '导入关系图时出错',
                description:
                    '关系图 JSON 无效，请检查 JSON 后重试。需要帮助？ 联系 support@chartdb.io',
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
            one_to_one: '一对一',
            one_to_many: '一对多',
            many_to_one: '多对一',
            many_to_many: '多对多',
        },

        canvas_context_menu: {
            new_table: '新建表',
            new_view: '新建视图',
            new_relationship: '新建关系',
            new_area: '新建区域',
            new_note: '新笔记',
        },

        table_node_context_menu: {
            edit_table: '编辑表',
            duplicate_table: 'Duplicate Table', // TODO: Translate
            delete_table: '删除表',
            add_relationship: 'Add Relationship', // TODO: Translate
        },

        canvas: {
            all_tables_hidden: '所有表格已隐藏',
            show_all_tables: '显示全部',
        },

        canvas_filter: {
            title: '筛选表格',
            search_placeholder: '搜索表格...',
            group_by_schema: '按模式分组',
            group_by_area: '按区域分组',
            no_tables_found: '未找到表格',
            empty_diagram_description: '创建表格以开始',
            no_tables_description: '尝试调整您的搜索或筛选',
            clear_filter: '清除筛选',
        },

        snap_to_grid_tooltip: '对齐到网格（按住 {{key}}）',

        tool_tips: {
            double_click_to_edit: '双击编辑',
        },

        language_select: {
            change_language: '语言',
        },

        on: '开启',
        off: '关闭',
    },
};

export const zh_CNMetadata: LanguageMetadata = {
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    code: 'zh_CN',
};
