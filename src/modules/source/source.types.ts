import { Source } from './source.entity';

export type SourcePatch = Pick<Source, 'id' | 'name'>;
