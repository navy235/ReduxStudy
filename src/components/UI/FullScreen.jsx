var React = require('react');
var classSet = require('classnames');
var FullScreen = React.createClass({

    displayName: 'FullScreen',

    getDefaultProps: function () {
        return {
            scroll: false
        };
    },

    getClassName: function () {
        return classSet({
            'fullscreen': true,
            'fullscreen-scroll': this.props.scroll
        })
    },

    render: function () {
        var className = this.getClassName();
        return (
            <div
                {...this.props}
                className={className}
                >
                {this.props.children}
            </div>
        );
    }
});

module.exports = FullScreen;
