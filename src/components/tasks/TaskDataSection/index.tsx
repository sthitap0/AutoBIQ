import React from 'react';
import { Container } from './Container';
import { DataPreview } from './DataPreview';

interface TaskDataSectionProps {
  taskId: string;
  data?: string;
  fileType?: 'json' | 'csv';
}

export function TaskDataSection({ taskId, data, fileType }: TaskDataSectionProps) {
  if (!data) return null;

  return (
    <Container title="Task's Data">
      <DataPreview data={data} fileType={fileType || 'json'} />
    </Container>
  );
}