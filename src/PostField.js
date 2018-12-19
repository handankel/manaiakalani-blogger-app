import React, {PureComponent} from 'react';
import cn from 'classnames';

export default class PostField extends PureComponent {
    constructor() {
        super();

        this.state = {
            isFocused: false
        };
    }

    onFocus = () => {
        this.setState({
            isFocused: true
        });
    };

    onBlur = () => {
        this.setState({
            isFocused: false
        });
    };

    render() {
        const {title, htmlFor, hidden} = this.props;
        const {isFocused} = this.state;
        const originalChildEl = React.Children.only(this.props.children);

        const childEl = React.cloneElement(
            originalChildEl,
            {...originalChildEl.props, onFocus: this.onFocus, onBlur: this.onBlur}
        );

        const TitleEl = htmlFor ? 'label' : 'div';

        return (
            <div className={cn('post-field', isFocused && 'post-field-focused')} hidden={hidden}>
                <TitleEl htmlFor={htmlFor} className={cn('post-field-title', isFocused && 'post-field-title-focused')}>
                    {title}
                </TitleEl>
                {childEl}
            </div>
        );
    }
}