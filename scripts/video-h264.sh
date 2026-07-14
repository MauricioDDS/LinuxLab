#!/usr/bin/env bash
# Convierte un video a H.264 para que los navegadores puedan reproducirlo.
#
# Motion Canvas (y muchos editores) exportan en H.265/HEVC, que Chrome y Firefox
# NO reproducen en la etiqueta <video>. El archivo se ve bien en el reproductor
# del sistema pero en la web no carga. Este script lo arregla.
#
#   ./scripts/video-h264.sh public/temario/tema-02/mi-video.mp4
#
# Reemplaza el archivo en el sitio. Si ya está en H.264, no hace nada.

set -euo pipefail

if [ $# -eq 0 ]; then
  echo "uso: $0 <archivo.mp4> [mas-archivos.mp4...]" >&2
  exit 1
fi

for video in "$@"; do
  if [ ! -f "$video" ]; then
    echo "no existe: $video" >&2
    continue
  fi

  codec=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "$video")

  if [ "$codec" = "h264" ]; then
    echo "ya está en H.264, se omite: $video"
    continue
  fi

  echo "convirtiendo de $codec a H.264: $video"
  tmp="${video%.*}_h264.mp4"
  ffmpeg -y -v error -i "$video" \
    -c:v libx264 -pix_fmt yuv420p -crf 21 -preset medium \
    -c:a aac -b:a 128k -movflags +faststart \
    "$tmp"
  mv "$tmp" "$video"
  echo "listo: $video"
done
