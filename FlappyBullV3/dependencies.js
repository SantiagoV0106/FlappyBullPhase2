import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import fs from 'fs'
import { SerialPort, ReadlineParser} from 'serialport';
import { Server as SocketIOServer} from 'socket.io';

export {express, SocketIOServer, cors,  SerialPort, ReadlineParser, dotenv, fs };