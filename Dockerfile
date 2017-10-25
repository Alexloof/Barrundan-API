FROM node:latest

# Clone the repo from github
RUN git clone https://mikaelwecode:57d0e32f34a39baf5e37a51e6cc0a3ec87bc368d@github.com/spixooze/Barrundan-API.git

WORKDIR /Barrundan-API

# Install all the dependencies
RUN npm install

# Expose port
EXPOSE 8080

# Run the application
CMD ["npm", "start"]