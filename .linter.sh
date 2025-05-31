#!/bin/bash
cd /home/kavia/workspace/code-generation/weathertext-26998-cf857764/weather_text
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

