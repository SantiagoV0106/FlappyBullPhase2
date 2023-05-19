import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import os from 'os';
import dotenv from 'dotenv'
import fs from 'fs'
import { SerialPort, ReadlineParser} from 'serialport';

export {express, Server, cors, os, SerialPort, ReadlineParser, dotenv, fs };