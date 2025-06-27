import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: `gumons`,
  timestamps: true,
})
export class GumonDocument extends Document {
  _id: string;

  @Prop({
    default: '',
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
    default: '',
  })
  description: string;

  @Prop({
    index: 1,
    type: Boolean,
    required: false,
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: Date,
    index: 1,
  })
  createdAt: Date;

  @Prop({
    type: Date,
  })
  updatedAt: Date;
}

export const GumonSchema = SchemaFactory.createForClass(GumonDocument);
