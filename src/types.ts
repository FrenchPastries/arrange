import { IncomingRequest } from '@frenchpastries/millefeuille'
import * as mf from '@frenchpastries/millefeuille'

export type Handler<Body, Return> = mf.Handler<IncomingRequest<Body>, Return>
