import type { LanguageMetadata, LanguageTranslation } from '../types';

export const fr: LanguageTranslation = {
    translation: {
        editor_sidebar: {
            new_diagram: 'Nouveau',
            browse: 'Ouvrir',
            tables: 'Tables',
            refs: 'Refs',
            dependencies: 'Dépendances',
            custom_types: 'Types Personnalisés',
            visuals: 'Visuels',
        },
        menu: {
            actions: {
                actions: 'Actions',
                new: 'Nouveau...',
                browse: 'Toutes les bases de données...',
                save: 'Enregistrer',
                import: 'Importer Base de Données',
                export_sql: 'Exporter SQL',
                export_as: 'Exporter en tant que',
                delete_diagram: 'Supprimer',
            },
            edit: {
                edit: 'Édition',
                undo: 'Annuler',
                redo: 'Rétablir',
                clear: 'Effacer',
            },
            view: {
                view: 'Affichage',
                show_sidebar: 'Afficher la Barre Latérale',
                hide_sidebar: 'Cacher la Barre Latérale',
                hide_cardinality: 'Cacher la Cardinalité',
                show_cardinality: 'Afficher la Cardinalité',
                hide_field_attributes: 'Masquer les Attributs de Champ',
                show_field_attributes: 'Afficher les Attributs de Champ',
                zoom_on_scroll: 'Zoom sur le Défilement',
                show_views: 'Vues de Base de Données',
                theme: 'Thème',
                show_dependencies: 'Afficher les Dépendances',
                hide_dependencies: 'Masquer les Dépendances',
                show_minimap: 'Afficher la Mini Carte',
                hide_minimap: 'Masquer la Mini Carte',
            },
            backup: {
                backup: 'Sauvegarde',
                export_diagram: 'Exporter le diagramme',
                restore_diagram: 'Restaurer le diagramme',
            },
            help: {
                help: 'Aide',
                docs_website: 'Documentation',
                join_discord: 'Rejoignez-nous sur Discord',
            },
        },

        profile_dialog: {
            title: 'Profil',
            description:
                'Affichez et mettez à jour les paramètres de votre compte.',
            fields: {
                email: 'Courriel',
                nickname: 'Pseudo',
                joined: 'Rejoint',
                profile_image: 'Image de profil',
                current_password: 'Mot de passe actuel',
                new_password: 'Nouveau mot de passe',
                confirm_new_password: 'Confirmer le nouveau mot de passe',
            },
            hints: {
                profile_image: "Fichiers image uniquement, jusqu'à 5 Mo.",
            },
            actions: {
                logout: 'Se déconnecter',
                logging_out: 'Déconnexion...',
                cancel: 'Annuler',
                save_changes: 'Enregistrer les modifications',
                saving: 'Enregistrement...',
            },
            errors: {
                image_type: 'Seuls les fichiers image sont autorisés.',
                image_size: "L'image de profil doit faire 5 Mo ou moins.",
                nickname_required: 'Le surnom est requis.',
                current_password_required: 'Le mot de passe actuel est requis.',
                new_password_required: 'Un nouveau mot de passe est requis.',
                new_password_length:
                    'Le nouveau mot de passe doit comporter au moins 6 caractères.',
                password_confirmation_mismatch:
                    'La confirmation du nouveau mot de passe ne correspond pas.',
                update_failed: 'Échec de la mise à jour du profil.',
                signout_failed: 'Échec de la déconnexion.',
            },
            toasts: {
                password_update_failed: {
                    title: 'Échec de la mise à jour du mot de passe',
                    description_with_error:
                        'Les modifications du profil ont été enregistrées. {{error}}',
                    description_without_error:
                        'Les modifications du profil ont été enregistrées, mais la mise à jour du mot de passe a échoué.',
                },
                avatar_upload_failed: {
                    title: "Échec du téléchargement de l'avatar",
                    description_fallback:
                        'Les modifications de pseudo et de mot de passe étaient toujours appliquées.',
                },
                profile_updated: {
                    title: 'Profil mis à jour',
                    description:
                        'Les modifications de votre profil ont été enregistrées.',
                },
            },
        },

        top_nav: {
            share_tooltip: 'Diagramme de partage',
        },

        share_dialog: {
            title: 'Diagramme de partage',
            description:
                "Invitez des collaborateurs en tant qu'éditeurs ou spectateurs.",
            access: {
                title: 'Votre accès',
                readonly_hint:
                    'Seul le propriétaire peut gérer les membres et les invitations.',
            },
            roles: {
                owner: 'Propriétaire',
                editor: 'Éditeur',
                viewer: 'Visionneuse',
            },
            status: {
                pending: 'En attente',
                accepted: 'Accepté',
                revoked: 'Révoqué',
                expired: 'Expiré',
            },
            invite: {
                section_title: 'Inviter par email',
                email_placeholder: 'coéquipier@exemple.com',
            },
            members: {
                section_title: 'Membres',
                empty: "Aucun membre invité pour l'instant.",
            },
            invitations: {
                section_title: 'Invitations en attente',
                empty: 'Aucune invitation en attente.',
            },
            history: {
                section_title: 'Historique des invitations',
                empty: "Aucune invitation pour l'instant.",
            },
            actions: {
                invite: 'Inviter',
                remove: 'Supprimer',
                revoke: 'Révoquer',
                copy_link: 'Copier le lien',
                refresh: 'Actualiser',
                close: 'Fermer',
            },
            labels: {
                your_access: 'Votre accès :',
                expires: 'Expire',
                updated: 'Mis à jour',
            },
            toasts: {
                invite_created: {
                    title: 'Invitation créée',
                    description: '{{email}} a été invité en tant que {{role}}.',
                },
                invite_failed: {
                    title: "Échec de l'invitation",
                },
                role_update_failed: {
                    title: 'Échec de la mise à jour du rôle',
                },
                remove_failed: {
                    title: 'Échec de la suppression du membre',
                },
                revoke_failed: {
                    title: "Échec de la révocation de l'invitation",
                },
                copy_success: {
                    title: "Lien d'invitation copié",
                    description: '{{url}}',
                },
                copy_failed: {
                    title: 'Échec de la copie',
                    description: "Impossible de copier le lien d'invitation.",
                },
            },
            errors: {
                email_required: 'Un e-mail est requis.',
                unknown_error: 'Erreur inconnue.',
                no_diagram_selected: "Aucun diagramme n'est sélectionné.",
            },
        },

        auth_gate: {
            title: 'Connectez-vous à ERDS',
            subtitle: 'Vos diagrammes sont stockés dans votre compte Supabase.',
            tabs: {
                sign_in: 'Se connecter',
                sign_up: "S'inscrire",
            },
            placeholders: {
                nickname: 'Pseudo',
                email: 'you@example.com',
                password: 'Mot de passe',
                confirm_password: 'Confirmer le mot de passe',
            },
            actions: {
                sign_in: 'Se connecter',
                signing_in: 'Connexion...',
                create_account: 'Créer un compte',
                creating_account: "Création d'un compte...",
            },
            alerts: {
                supabase_not_configured_title: "Supabase n'est pas configuré",
                supabase_not_configured_description:
                    "Ajoutez les variables d'environnement SUPABASE_URL et SUPABASE_PUBLISHABLE_DEFAULT_KEY pour continuer.",
                success_title: 'Succès',
                authentication_failed_title: "Échec de l'authentification",
            },
            validation: {
                email_and_password_required:
                    "L'e-mail et le mot de passe sont requis.",
                nickname_required: 'Le surnom est requis.',
                email_required: 'Un e-mail est requis.',
                password_required: 'Un mot de passe est requis.',
                password_min_length:
                    'Le mot de passe doit comporter au moins 6 caractères.',
                password_confirmation_mismatch:
                    'La confirmation du mot de passe ne correspond pas.',
                sign_in_failed: 'Échec de la connexion.',
                create_account_failed: 'Échec de la création du compte.',
            },
            success: {
                account_created:
                    'Compte créé. Si la confirmation par e-mail est activée, vérifiez votre boîte de réception avant de vous connecter.',
            },
        },

        invite_accept_page: {
            loading: "Acceptation de l'invitation...",
            error_title: "L'invitation n'a pas pu être acceptée",
            actions: {
                retry: 'Réessayer',
                go_to_app: "Aller à l'application",
            },
            errors: {
                expired: "Ce lien d'invitation a expiré.",
                mismatch:
                    'Cette invitation a été envoyée à un autre compte de messagerie.',
                revoked: 'Cette invitation a été révoquée.',
                not_pending: "Cette invitation n'est plus active.",
                not_found: 'Invitation introuvable.',
                token_missing: "Le jeton d'invitation est manquant.",
                supabase_not_configured: "Supabase n'est pas configuré.",
                accept_failed: "Impossible d'accepter l'invitation.",
                unknown_error: 'Erreur inconnue.',
                no_diagram_returned:
                    "Invitation acceptée, mais aucun diagramme n'a été renvoyé.",
                invitee_email_required: "L'e-mail de l'invité est requis.",
            },
        },

        collab_presence: {
            online_count: '{{count}} en ligne',
            role: {
                owner: 'Propriétaire',
                editor: 'Éditeur',
                viewer: 'Visionneuse',
            },
        },

        cloud_sync_toasts: {
            restored_title: 'Synchronisation cloud restaurée',
            restored_description:
                'Les modifications sont à nouveau synchronisées avec Supabase.',
            paused_title: 'Synchronisation cloud suspendue',
            paused_description:
                'Vos modifications locales sont sécurisées et seront réessayées automatiquement.',
            read_only_title: 'Accès en lecture seule',
            read_only_description:
                'Vous pouvez afficher ce diagramme partagé mais vous ne pouvez pas enregistrer les modifications.',
            access_removed_title: 'Accès supprimé',
            access_removed_description:
                'Votre accès à ce diagramme partagé a été supprimé.',
        },

        collaboration_errors: {
            expired: "Ce lien d'invitation a expiré.",
            mismatch:
                'Cette invitation a été envoyée à un autre compte de messagerie.',
            revoked: 'Cette invitation a été révoquée.',
            not_pending: "Cette invitation n'est plus active.",
            not_found: 'Invitation introuvable.',
            invitee_email_required: "L'e-mail de l'invité est requis.",
            token_missing: "Un jeton d'invitation est requis.",
            supabase_not_configured: "Supabase n'est pas configuré.",
        },

        delete_diagram_alert: {
            title: 'Supprimer le Diagramme',
            description:
                'Cette action est irréversible. Cela supprimera définitivement le diagramme.',
            cancel: 'Annuler',
            delete: 'Supprimer',
        },

        clear_diagram_alert: {
            title: 'Effacer le Diagramme',
            description:
                'Cette action est irréversible. Cela supprimera définitivement toutes les données dans le diagramme.',
            cancel: 'Annuler',
            clear: 'Effacer',
        },

        reorder_diagram_alert: {
            title: 'Organiser Automatiquement le Diagramme',
            description:
                'Cette action réorganisera toutes les tables dans le diagramme. Voulez-vous continuer ?',
            reorder: 'Organiser Automatiquement',
            cancel: 'Annuler',
        },

        copy_to_clipboard_toast: {
            unsupported: {
                title: 'Échec de la copie',
                description: 'Presse-papiers non pris en charge',
            },
            failed: {
                title: 'Échec de la copie',
                description: 'Quelque chose a mal tourné. Veuillez réessayer.',
            },
        },

        theme: {
            system: 'Système',
            light: 'Clair',
            dark: 'Sombre',
        },

        zoom: {
            on: 'Activé',
            off: 'Désactivé',
        },

        last_saved: 'Dernière sauvegarde',
        saved: 'Enregistré',
        loading_diagram: 'Chargement du diagramme...',
        deselect_all: 'Tout désélectionner',
        select_all: 'Tout sélectionner',
        clear: 'Effacer',
        show_more: 'Afficher Plus',
        show_less: 'Afficher Moins',
        copy_to_clipboard: 'Copier dans le presse-papiers',
        copied: 'Copié !',

        side_panel: {
            view_all_options: 'Voir toutes les Options...',
            tables_section: {
                tables: 'Tables',
                add_table: 'Ajouter une Table',
                add_view: 'Ajouter une Vue',
                filter: 'Filtrer',
                collapse: 'Réduire Tout',
                clear: 'Effacer le Filtre',
                no_results:
                    'Aucune table trouvée correspondant à votre filtre.',
                show_list: 'Afficher la Liste des Tableaux',
                show_dbml: "Afficher l'éditeur DBML",
                all_hidden: 'Toutes les tables sont masquées',
                show_all: 'Tout afficher',

                table: {
                    fields: 'Champs',
                    nullable: 'Nullable?',
                    primary_key: 'Clé Primaire',
                    indexes: 'Index',
                    check_constraints: 'Contraintes de vérification',
                    comments: 'Commentaires',
                    no_comments: 'Pas de commentaires',
                    add_field: 'Ajouter un Champ',
                    add_index: 'Ajouter un Index',
                    add_check: 'Ajouter une vérification',
                    index_select_fields: 'Sélectionner des champs',
                    no_types_found: 'Aucun type trouvé',
                    field_name: 'Nom',
                    field_type: 'Type',
                    field_actions: {
                        title: 'Attributs du Champ',
                        unique: 'Unique',
                        auto_increment: 'Auto-incrément',
                        comments: 'Commentaires',
                        no_comments: 'Pas de commentaires',
                        delete_field: 'Supprimer le Champ',
                        // TODO: Translate
                        default_value: 'Default Value',
                        no_default: 'No default',
                        // TODO: Translate
                        character_length: 'Max Length',
                        precision: 'Précision',
                        scale: 'Échelle',
                    },
                    index_actions: {
                        title: "Attributs de l'Index",
                        name: 'Nom',
                        unique: 'Unique',
                        index_type: "Type d'index",
                        delete_index: "Supprimer l'Index",
                    },
                    check_constraint_actions: {
                        title: 'Contrainte de vérification',
                        expression: 'Expression',
                        delete: 'Supprimer la contrainte',
                    },
                    table_actions: {
                        title: 'Actions de la Table',
                        add_field: 'Ajouter un Champ',
                        add_index: 'Ajouter un Index',
                        duplicate_table: 'Tableau dupliqué',
                        delete_table: 'Supprimer la Table',
                        change_schema: 'Changer le Schéma',
                    },
                },
                empty_state: {
                    title: 'Aucune table',
                    description: 'Créez une table pour commencer',
                },
            },
            refs_section: {
                refs: 'Refs',
                filter: 'Filtrer',
                collapse: 'Réduire Tout',
                add_relationship: 'Ajouter une Relation',
                relationships: 'Relations',
                dependencies: 'Dépendances',
                relationship: {
                    relationship: 'Relation',
                    primary: 'Table Principale',
                    foreign: 'Table Liée',
                    cardinality: 'Cardinalité',
                    delete_relationship: 'Supprimer',
                    switch_tables: 'Inverser les tables',
                    relationship_actions: {
                        title: 'Actions',
                        delete_relationship: 'Supprimer',
                    },
                },
                dependency: {
                    dependency: 'Dépendance',
                    table: 'Table',
                    dependent_table: 'Vue Dépendante',
                    delete_dependency: 'Supprimer',
                    dependency_actions: {
                        title: 'Actions',
                        delete_dependency: 'Supprimer',
                    },
                },
                empty_state: {
                    title: 'Aucune relation',
                    description: 'Créez une relation pour commencer',
                },
            },

            areas_section: {
                areas: 'Zones',
                add_area: 'Ajouter une Zone',
                filter: 'Filtrer',
                clear: 'Effacer le Filtre',
                no_results: 'Aucune zone trouvée correspondant à votre filtre.',

                area: {
                    area_actions: {
                        title: 'Actions de la Zone',
                        edit_name: 'Modifier le Nom',
                        delete_area: 'Supprimer la Zone',
                    },
                },
                empty_state: {
                    title: 'Aucune zone',
                    description: 'Créez une zone pour commencer',
                },
            },

            visuals_section: {
                visuals: 'Visuels',
                tabs: {
                    areas: 'Zones',
                    notes: 'Notes',
                },
            },

            notes_section: {
                filter: 'Filtrer',
                add_note: 'Ajouter une Note',
                no_results: 'Aucune note trouvée',
                clear: 'Effacer le Filtre',
                empty_state: {
                    title: 'Pas de Notes',
                    description:
                        'Créez une note pour ajouter des annotations de texte sur le canevas',
                },
                note: {
                    empty_note: 'Note vide',
                    note_actions: {
                        title: 'Actions de Note',
                        edit_content: 'Modifier le Contenu',
                        delete_note: 'Supprimer la Note',
                    },
                },
            },

            custom_types_section: {
                custom_types: 'Types Personnalisés',
                filter: 'Filtrer',
                clear: 'Effacer le Filtre',
                no_results:
                    'Aucun type personnalisé trouvé correspondant à votre filtre.',
                new_type: 'Nouveau Type',
                empty_state: {
                    title: 'Aucun type personnalisé',
                    description:
                        "Les types personnalisés apparaîtront ici lorsqu'ils seront disponibles dans votre base de données",
                },
                custom_type: {
                    kind: 'Type',
                    enum_values: 'Valeurs Enum',
                    composite_fields: 'Champs',
                    no_fields: 'Aucun champ défini',
                    no_values: "Aucune valeur d'énumération définie",
                    field_name_placeholder: 'Nom du champ',
                    field_type_placeholder: 'Sélectionner le type',
                    add_field: 'Ajouter un Champ',
                    no_fields_tooltip:
                        'Aucun champ défini pour ce type personnalisé',
                    custom_type_actions: {
                        title: 'Actions',
                        highlight_fields: 'Surligner les Champs',
                        delete_custom_type: 'Supprimer',
                        clear_field_highlight: 'Effacer le Surlignage',
                    },
                    delete_custom_type: 'Supprimer le Type',
                },
            },
        },

        toolbar: {
            zoom_in: 'Zoom Avant',
            zoom_out: 'Zoom Arrière',
            save: 'Enregistrer',
            show_all: 'Afficher Tout',
            undo: 'Annuler',
            redo: 'Rétablir',
            reorder_diagram: 'Organiser Automatiquement le Diagramme',
            // TODO: Translate
            clear_custom_type_highlight: 'Clear highlight for "{{typeName}}"',
            custom_type_highlight_tooltip:
                'Highlighting "{{typeName}}" - Click to clear',
            highlight_overlapping_tables: 'Surligner les tables chevauchées',
            filter: 'Filtrer les Tables',
        },

        new_diagram_dialog: {
            database_selection: {
                title: 'Quelle est votre Base de Données ?',
                description:
                    'Chaque base de données a ses propres fonctionnalités et capacités uniques.',
                check_examples_long: 'Voir les Exemples',
                check_examples_short: 'Exemples',
            },

            import_database: {
                title: 'Importer votre Base de Données',
                database_edition: 'Édition de la Base de Données :',
                step_1: 'Exécutez ce script dans votre base de données :',
                step_2: 'Collez le résultat du script ici →',
                script_results_placeholder: 'Résultats du script ici...',
                ssms_instructions: {
                    button_text: 'Instructions SSMS',
                    title: 'Instructions',
                    step_1: 'Allez dans Outils > Options > Résultats des Requêtes > SQL Server.',
                    step_2: 'Si vous utilisez "Résultats en Grille", changez le nombre maximum de caractères récupérés pour les données non-XML (définir à 9999999).',
                },
                instructions_link: "Besoin d'aide ? Regardez comment",
                check_script_result: 'Vérifier le résultat du Script',
            },

            cancel: 'Annuler',
            back: 'Retour',
            import_from_file: "Importer à partir d'un fichier",
            empty_diagram: 'Base de données vide',
            continue: 'Continuer',
            import: 'Importer',
        },

        open_diagram_dialog: {
            title: 'Ouvrir Base de Données',
            description:
                'Sélectionnez un diagramme à ouvrir dans la liste ci-dessous.',
            table_columns: {
                name: 'Nom',
                created_at: 'Créé le',
                last_modified: 'Dernière modification',
                tables_count: 'Tables',
            },
            cancel: 'Annuler',
            open: 'Ouvrir',
            new_database: 'Nouvelle Base de Données',

            diagram_actions: {
                open: 'Ouvrir',
                duplicate: 'Dupliquer',
                delete: 'Supprimer',
            },
        },

        export_sql_dialog: {
            title: 'Exporter SQL',
            description:
                'Exportez le schéma de votre diagramme en script {{databaseType}}',
            close: 'Fermer',
            loading: {
                text: "L'IA génère un SQL pour {{databaseType}}...",
                description: "Cela devrait prendre jusqu'à 30 secondes.",
            },
            error: {
                message:
                    'Erreur lors de la génération du script SQL. Veuillez réessayer plus tard ou <0>contactez-nous</0>.',
                description:
                    "N'hésitez pas à utiliser votre OPENAI_TOKEN, voir le manuel <0>ici</0>.",
            },
        },

        export_image_dialog: {
            title: "Exporter l'image",
            description:
                "Choisissez le facteur d'échelle pour l'image exportée.",
            scale_1x: '1x (Basse qualité)',
            scale_2x: '2x (Qualité normale)',
            scale_4x: '4x (Meilleure qualité)',
            cancel: 'Annuler',
            export: 'Exporter',
            // TODO: Translate
            advanced_options: 'Advanced Options',
            pattern: 'Include background pattern',
            pattern_description: 'Add subtle grid pattern to background.',
            transparent: 'Transparent background',
            transparent_description: 'Remove background color from image.',
        },

        new_table_schema_dialog: {
            title: 'Sélectionner un Schéma',
            description:
                'Plusieurs schémas sont actuellement affichés. Sélectionnez-en un pour la nouvelle table.',
            cancel: 'Annuler',
            confirm: 'Confirmer',
        },

        star_us_dialog: {
            title: 'Aidez-nous à nous améliorer',
            description:
                "Souhaitez-vous nous donner une étoile sur GitHub ? Il ne suffit que d'un clic !",
            close: 'Pas maintenant',
            confirm: 'Bien sûr !',
        },

        update_table_schema_dialog: {
            title: 'Modifier le Schéma',
            description: 'Mettre à jour le schéma de la table "{{tableName}}"',
            cancel: 'Annuler',
            confirm: 'Modifier',
        },
        create_table_schema_dialog: {
            title: 'Créer un Nouveau Schéma',
            description:
                "Aucun schéma n'existe encore. Créez votre premier schéma pour organiser vos tables.",
            create: 'Créer',
            cancel: 'Annuler',
        },

        create_relationship_dialog: {
            title: 'Créer une Relation',
            primary_table: 'Table Principale',
            primary_field: 'Champ Principal',
            referenced_table: 'Table Référencée',
            referenced_field: 'Champ Référencé',
            primary_table_placeholder: 'Sélectionner une table',
            primary_field_placeholder: 'Sélectionner un champ',
            referenced_table_placeholder: 'Sélectionner une table',
            referenced_field_placeholder: 'Sélectionner un champ',
            no_tables_found: 'Aucune table trouvée',
            no_fields_found: 'Aucun champ trouvé',
            create: 'Créer',
            cancel: 'Annuler',
        },

        import_database_dialog: {
            title: 'Importer dans le Diagramme Actuel',
            override_alert: {
                title: 'Importer Base de Données',
                content: {
                    alert: "L'importation de ce diagramme affectera les tables et relations existantes.",
                    new_tables:
                        '<bold>{{newTablesNumber}}</bold> nouvelles tables seront ajoutées.',
                    new_relationships:
                        '<bold>{{newRelationshipsNumber}}</bold> nouvelles relations seront créées.',
                    tables_override:
                        '<bold>{{tablesOverrideNumber}}</bold> tables seront écrasées.',
                    proceed: 'Voulez-vous continuer ?',
                },
                import: 'Importer',
                cancel: 'Annuler',
            },
        },
        export_diagram_dialog: {
            title: 'Exporter le Diagramme',
            description: "Sélectionner le format d'exportation :",
            format_json: 'JSON',
            cancel: 'Annuler',
            export: 'Exporter',
            error: {
                title: "Erreur lors de l'exportation du diagramme",
                description:
                    "Une erreur s'est produite. Besoin d'aide ? support@chartdb.io",
            },
        },
        import_diagram_dialog: {
            title: 'Importer un diagramme',
            description: 'Coller le diagramme au format JSON ci-dessous :',
            cancel: 'Annuler',
            import: 'Exporter',
            error: {
                title: "Erreur lors de l'exportation du diagramme",
                description:
                    "Le diagramme JSON n'est pas valide. Veuillez vérifier le JSON et réessayer. Besoin d'aide ? support@chartdb.io",
            },
        },
        import_dbml_dialog: {
            example_title: "Exemple d'importation DBML",
            title: 'Import DBML',
            description:
                'Importer un schéma de base de données à partir du format DBML.',
            import: 'Importer',
            cancel: 'Annuler',
            skip_and_empty: 'Passer et vider',
            show_example: 'Afficher un exemple',
            error: {
                title: 'Erreur',
                description:
                    "Erreur d'analyse du DBML. Veuillez vérifier la syntaxe.",
            },
        },
        relationship_type: {
            one_to_one: 'Un à Un',
            one_to_many: 'Un à Plusieurs',
            many_to_one: 'Plusieurs à Un',
            many_to_many: 'Plusieurs à Plusieurs',
        },

        canvas_context_menu: {
            new_table: 'Nouvelle Table',
            new_view: 'Nouvelle Vue',
            new_relationship: 'Nouvelle Relation',
            new_area: 'Nouvelle Zone',
            new_note: 'Nouvelle Note',
        },

        table_node_context_menu: {
            edit_table: 'Éditer la Table',
            duplicate_table: 'Tableau Dupliqué',
            delete_table: 'Supprimer la Table',
            add_relationship: 'Ajouter une Relation',
        },

        canvas: {
            all_tables_hidden: 'Toutes les tables sont masquées',
            show_all_tables: 'Tout afficher',
        },

        canvas_filter: {
            title: 'Filtrer les Tables',
            search_placeholder: 'Rechercher des tables...',
            group_by_schema: 'Grouper par Schéma',
            group_by_area: 'Grouper par Zone',
            no_tables_found: 'Aucune table trouvée',
            empty_diagram_description: 'Créez une table pour commencer',
            no_tables_description:
                'Essayez de modifier votre recherche ou filtre',
            clear_filter: 'Effacer le filtre',
        },

        snap_to_grid_tooltip:
            'Aligner sur la grille (maintenir la touche {{key}})',

        tool_tips: {
            double_click_to_edit: 'Double-cliquez pour modifier',
        },

        language_select: {
            change_language: 'Langue',
        },

        on: 'Activé',
        off: 'Désactivé',
    },
};

export const frMetadata: LanguageMetadata = {
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
};
