#!/usr/bin/env bash
set -euo pipefail

# 1. Free any stale processes on ports 8000 and 5173
fuser -k 8000/tcp 5173/tcp 2>/dev/null || true

# 2. Clean up child processes when you press Ctrl+C or exit
cleanup() {
    echo ""
    echo "Stopping servers..."
    kill "${API_PID:-}" "${FRONT_PID:-}" 2>/dev/null || true
    fuser -k 8000/tcp 5173/tcp 2>/dev/null || true
    exit 0
}
trap cleanup INT TERM EXIT

# 3. Start PHP API in background
echo "PHP API:  http://localhost:8000"
php -S localhost:8000 -t dist/api >/dev/null 2>&1 &
API_PID=$!

# 4. Start Vite in foreground (or background + wait)
echo "Frontend: http://localhost:5173 (Vite)"
npx vite --port 5173 --strictPort &
FRONT_PID=$!

wait
