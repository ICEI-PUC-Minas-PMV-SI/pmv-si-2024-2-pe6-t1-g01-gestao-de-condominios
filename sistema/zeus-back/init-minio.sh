#!/bin/sh

# Espera o MinIO iniciar
until curl -s http://minio:9000; do
  echo "Esperando o MinIO iniciar..."
  sleep 2
done

# Cria o bucket, se não existir
mc alias set myminio http://minio:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}
mc mb myminio/${MINIO_BUCKET} || echo "Bucket já existe"