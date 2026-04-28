/**
 * Wordpress Dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	CheckboxControl,
	Icon,
	PanelBody,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import icons from './icons';
import type { ConditionalProps } from './types';

const Inspector = (props: ConditionalProps) => {
	const {
		attributes: {
			fromDate,
			toDate,
			usersOnly,
			hideWithinDateRange,
			showLoginNotice,
			includeLoginForm,
			loginNotice,
			hideOnMobile,
			hideOnDesktop,
		},
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<PanelBody
				title={__('Device Visibility', 'ctx-blocks')}
				initialOpen={true}
			>
				<CheckboxControl
					label={__('Hide on mobile', 'ctx-blocks')}
					checked={hideOnMobile}
					onChange={(value) =>
						setAttributes({ hideOnMobile: !hideOnMobile })
					}
				/>
				<CheckboxControl
					label={__('Hide on desktop', 'ctx-blocks')}
					checked={hideOnDesktop}
					onChange={(value) =>
						setAttributes({ hideOnDesktop: !hideOnDesktop })
					}
				/>
			</PanelBody>
			<PanelBody title={__('Date', 'ctx-blocks')} initialOpen={true}>
				<div className="styleSelector">
					<Button
						onClick={() =>
							setAttributes({ hideWithinDateRange: true })
						}
						className={hideWithinDateRange ? 'active' : ''}
					>
						<Icon size="40" className="icon" icon={icons.hide} />
						<span>{__('Hide', 'ctx-blocks')}</span>
					</Button>
					<Button
						onClick={() =>
							setAttributes({ hideWithinDateRange: false })
						}
						className={hideWithinDateRange ? '' : 'active'}
					>
						<Icon size="40" className="icon" icon={icons.show} />

						<span>{__('Show', 'ctx-blocks')}</span>
					</Button>
				</div>

				<TextControl
					value={fromDate}
					label={__('From', 'ctx-blocks')}
					onChange={(newDate) => setAttributes({ fromDate: newDate })}
					is12Hour={false}
					type="date"
				/>
				<TextControl
					label={__('To', 'ctx-blocks')}
					value={toDate}
					onChange={(newDate) => setAttributes({ toDate: newDate })}
					is12Hour={false}
					type="date"
				/>
			</PanelBody>
			<PanelBody
				title={__('Access Control', 'ctx-blocks')}
				initialOpen={true}
			>
				<ToggleControl
					label={__('Show only to logged in users', 'ctx-blocks')}
					checked={usersOnly}
					onChange={(value) =>
						setAttributes({ usersOnly: !usersOnly })
					}
				/>

				<ToggleControl
					label={__('Show login notice', 'ctx-blocks')}
					checked={showLoginNotice}
					onChange={(value) =>
						setAttributes({ showLoginNotice: !showLoginNotice })
					}
				/>

				{showLoginNotice && (
					<>
						<TextControl
							label={__('Login notice', 'ctx-blocks')}
							value={loginNotice}
							onChange={(value) =>
								setAttributes({ loginNotice: value })
							}
						/>
						<CheckboxControl
							label={__('Include login form', 'ctx-blocks')}
							checked={includeLoginForm}
							onChange={(value) =>
								setAttributes({
									includeLoginForm: !includeLoginForm,
								})
							}
						/>
					</>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
