import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './header.module.css';
import CustomCodeBlock from '@/components/custom-code-block/custom-code-block';
import { Card, Col, Container, Row, Stack } from 'react-bootstrap';
import CustomCard from '@/components/customCard/customCard';
import GoogleCloudBuild from '@/components/goolgeCloudExample/googleCloudBuild';
import GoogleCloudSql from '@/components/goolgeCloudExample/googleCloudSql';
import GoogleCloudRunServiceToService from '@/components/goolgeCloudExample/googleCloudServiceToService/googleCloudServiceToService';
import GoogleCloudRunSettings from '@/components/goolgeCloudExample/googleCloudRunSettings/googleCloudRunSettings';

export default function GoolgeCloudExample() {
	return (
		<>
			<Container>
				<Stack gap={2}>
					<Row>
						<Col md={6} className="pt-1 px-1">
							<GoogleCloudSql />
						</Col>
						<Col md={6} className="pt-1 px-1">
							<GoogleCloudBuild />
						</Col>
					</Row>
					<GoogleCloudRunSettings />
					<GoogleCloudRunServiceToService />
				</Stack>
			</Container>
		</>
	);
}
