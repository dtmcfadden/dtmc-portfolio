import { useEffect, useState } from 'react';
import { server } from '@/config/index';
import styles from './header.module.css';
import CustomCodeBlock from '@/components/custom-code-block/custom-code-block';
import { Card, Col, Container, Row } from 'react-bootstrap';
import CustomCard from '@/components/customCard/customCard';
import GoogleCloudBuild from '@/components/goolgeCloudExample/googleCloudBuild';
import GoogleCloudRunConnections from '@/components/goolgeCloudExample/googleCloudRunConnections';
import GoogleCloudRunContainer from '@/components/goolgeCloudExample/googleCloudRunContainer';
import GoogleCloudRunSecurity from '@/components/goolgeCloudExample/googleCloudRunSecurity';
import GoogleCloudSql from '@/components/goolgeCloudExample/googleCloudSql';

export default function GoolgeCloudExample() {
	return (
		<>
			<Container>
				<Row>
					<Col md={6} className="pt-1 px-1">
						<GoogleCloudSql />
					</Col>
					<Col md={6} className="pt-1 px-1">
						<GoogleCloudBuild />
					</Col>
				</Row>
				<CustomCard header="Cloud Run">
					<Row>
						<Col md={4} className="pt-1 px-1">
							<GoogleCloudRunContainer />
						</Col>
						<Col md={4} className="pt-1 px-1">
							<GoogleCloudRunConnections />
						</Col>
						<Col md={4} className="pt-1 px-1">
							<GoogleCloudRunSecurity />
						</Col>
					</Row>
				</CustomCard>
			</Container>
		</>
	);
}
