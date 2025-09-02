import Redis from 'ioredis';
import * as tf from '@tensorflow/tfjs-node';
import { createServer } from '@grpc/grpc-js';
import { OddsEngineService } from './proto/odds_engine_grpc_pb';
import { OddsEngineServer } from './services/odds-engine';

const redis = new Redis(process.env.REDIS_URL!);
const pubSub = new Redis(process.env.REDIS_URL!);

// Machine Learning model for dynamic odds calculation
class DynamicOddsModel {
  private model: tf.LayersModel;

  async loadModel() {
    this.model = await tf.loadLayersModel('file://./model/model.json');
  }

  async calculateOdds(eventData: any): Promise<number> {
    const input = tf.tensor2d([[
      eventData.team1Performance,
      eventData.team2Performance,
      eventData.historicalData,
      eventData.marketSentiment
    ]]);
    
    const prediction = this.model.predict(input) as tf.Tensor;
    const odds = await prediction.data();
    
    return odds[0];
  }
}

const oddsModel = new DynamicOddsModel();
await oddsModel.loadModel();

// GRPC Server implementation
const server = new createServer();
server.addService(OddsEngineService, new OddsEngineServer(redis, pubSub, oddsModel));
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Odds Engine gRPC server running on port 50051');
});
