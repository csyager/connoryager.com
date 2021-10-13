#!/bin/bash

while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -t|--title)
            TITLE="$2"
            shift # past argument
            shift # past value
            ;;
        -u|--url)
            URL="$2"
            shift
            shift
            ;;
        -a|--additional-message)
            ADDITIONAL_MESSAGE="$2"
            shift
            shift
            ;;
    esac
done

aws lambda invoke --function-name sendBlogNotificationEmail --cli-binary-format raw-in-base64-out --payload "{\"title\": \"${TITLE}\", \"url\": \"${URL}\", \"additional_message\": \"${ADDITIONAL_MESSAGE}\"}" response.json
