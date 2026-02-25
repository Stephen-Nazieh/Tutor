# scripts/restore.sh
docker exec tutorme-db psql -U postgres -c "CREATE DATABASE tutorme_restore;"
zcat ${BACKUP_FILE} | docker exec -i tutorme-db psql -U postgres -d tutorme_restore