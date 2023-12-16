# FFMPEG

This repo was inspiration for the implementation here: https://github.com/serverlesspub/ffmpeg-aws-lambda-layer

This layer is held in a separate stack to the other resources, so the layer version number doesn't get incremented each time the backend resources get deployed.

The ffmpeg and ffprobe binaries will be in `/opt/bin/` after linking the layer to a Lambda function.
