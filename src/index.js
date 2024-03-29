import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "notes",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



var Space = (function () {
  function Space() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.ratio = window.innerHeight < 400 ? 0.6 : 1;
      this.r = 120;
      this.counter = 0;
  }
  Space.prototype.init = function () {
      this.createElement();
      this.loop();
  };
  Space.prototype.createElement = function () {
      var scale = this.ratio;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.width = '100%';
      this.canvas.style.background = 'rgb(0, 0, 0)';
      this.ctx.transform(scale, 0, 0, -scale, this.canvas.width / 2, this.canvas.height / 2);
      document.body.appendChild(this.canvas);
      for (var i = 0; i < 450; i++) {
          this.createParticle();
      }
  };
  Space.prototype.createParticle = function () {
      this.particles.push({
          color: Math.random() > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.4)",
          radius: Math.random() * 5,
          x: Math.cos(Math.random() * 7 + Math.PI) * this.r,
          y: Math.sin(Math.random() * 7 + Math.PI) * this.r,
          ring: Math.random() * this.r * 3,
          move: ((Math.random() * 4) + 1) / 500,
          random: Math.random() * 7
      });
  };
  Space.prototype.moveParticle = function (p) {
      p.ring = Math.max(p.ring - 1, this.r);
      p.random += p.move;
      p.x = Math.cos(p.random + Math.PI) * p.ring;
      p.y = Math.sin(p.random + Math.PI) * p.ring;
  };
  Space.prototype.resetParticle = function (p) {
      p.ring = Math.random() * this.r * 3;
      p.radius = Math.random() * 5;
  };
  Space.prototype.disappear = function (p) {
      if (p.radius < 0.8) {
          this.resetParticle(p);
      }
      p.radius *= 0.994;
  };
  Space.prototype.draw = function (p) {
      this.ctx.beginPath();
      this.ctx.fillStyle = p.color;
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
  };
  Space.prototype.loop = function () {
      this.ctx.clearRect(-this.canvas.width , -this.canvas.height, this.canvas.width * 2, this.canvas.height * 2);
      if (this.counter < this.particles.length) {
          this.counter++;
      }
      this.ctx.shadowBlur = 20;
      this.ctx.shadowColor = "#fff";
      for (var i = 0; i < this.counter; i++) {
          this.disappear(this.particles[i]);
          this.moveParticle(this.particles[i]);
          this.draw(this.particles[i]);
      }
      requestAnimationFrame(this.loop.bind(this));
  };
  return Space;
})();
window.onload = function () {
  var space = new Space();
  space.init();
};

