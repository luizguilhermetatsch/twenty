import { PreComputedChipGeneratorsContext } from '@/object-metadata/contexts/PreComputedChipGeneratorsContext';
import { isFieldFullName } from '@/object-record/record-field/types/guards/isFieldFullName';
import { isFieldNumber } from '@/object-record/record-field/types/guards/isFieldNumber';
import { isFieldText } from '@/object-record/record-field/types/guards/isFieldText';
import { isNonEmptyString } from '@sniptt/guards';
import { useContext } from 'react';
import { useRecoilValue } from 'recoil';

import { isFieldActor } from '@/object-record/record-field/types/guards/isFieldActor';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { isDefined } from 'twenty-shared/utils';
import { FieldContext } from '../../contexts/FieldContext';

export const useChipFieldDisplay = () => {
  const {
    recordId,
    fieldDefinition,
    isLabelIdentifier,
    labelIdentifierLink,
    isLabelIdentifierCompact,
    disableChipClick,
    maxWidth,
    triggerEvent,
    onRecordChipClick,
  } = useContext(FieldContext);

  const { chipGeneratorPerObjectPerField } = useContext(
    PreComputedChipGeneratorsContext,
  );

  if (!isDefined(chipGeneratorPerObjectPerField)) {
    throw new Error('Chip generator per object per field is not defined');
  }

  const objectNameSingular =
    isFieldText(fieldDefinition) ||
    isFieldFullName(fieldDefinition) ||
    isFieldNumber(fieldDefinition) ||
    isFieldActor(fieldDefinition)
      ? fieldDefinition.metadata.objectMetadataNameSingular
      : undefined;

  const recordValue = useRecoilValue(recordStoreFamilyState(recordId));

  if (!isNonEmptyString(objectNameSingular)) {
    throw new Error('Object metadata name singular is not a non-empty string');
  }

  return {
    objectNameSingular,
    recordValue,
    isLabelIdentifier,
    labelIdentifierLink,
    isLabelIdentifierCompact,
    disableChipClick,
    maxWidth,
    triggerEvent,
    onRecordChipClick,
  };
};
