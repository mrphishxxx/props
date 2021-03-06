import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';

import Vote from './vote';

describe('props/vote', () => {
  const onUpvote = expect.createSpy();
  const undoUpvote = expect.createSpy();
  const defaultProps = {
    onUpvote: onUpvote,
    upvotesCount: 10,
    isUpvotePossible: true,
    upVoting: false,
    undoUpvote: undoUpvote,
  };
  const component = TestUtils.renderIntoDocument(
    <Vote {...defaultProps}/>
  );

  it('renders', () => {
    expect(TestUtils.findRenderedComponentWithType(component, Vote)).toExist();
  });

  describe('rating button', () => {
    const element = TestUtils
      .findRenderedDOMComponentWithClass(component, 'rating-button');

    describe('when rating is greater 0', () => {
      it('displays current rating', () => {
        expect(element.textContent).toEqual('Rating + 10');
      });
    });

    describe('when rating is 0', () => {
      const componentWithoutRating = TestUtils.renderIntoDocument(
        <Vote {...defaultProps} upvotesCount={0}/>
      );
      it('is not visible', () => {
        expect(() => {
          TestUtils.findRenderedDOMComponentWithClass(componentWithoutRating, 'rating-button');
        }).toThrow('Did not find exactly one match (found: 0) for class:rating-button');
      });
    });
  });

  describe('upvote button', () => {
    describe('when isUpvotePossible flag is set', () => {
      it('is visible', () => {
        expect(() => {
          TestUtils.findRenderedDOMComponentWithClass(componentWithoutRating, 'upvote-button');
        }).toNotThrow;
      });

      it('runs passed onUpvote handler when clicked', () => {
        const element = TestUtils
          .findRenderedDOMComponentWithClass(component, 'upvote-button');
        TestUtils.Simulate.click(element);
        expect(onUpvote).toHaveBeenCalled();
      });
    });

    describe('when isUpvotePossible flag is not set', () => {
      const componentWithDisabledVoting = TestUtils.renderIntoDocument(
        <Vote {...defaultProps} isUpvotePossible={false}/>
      );
      it('is not visible', () => {
        expect(() => {
          TestUtils.findRenderedDOMComponentWithClass(componentWithDisabledVoting, 'upvote-button');
        }).toThrow('Did not find exactly one match (found: 0) for class:upvote-button');
      });
    });
  });

  describe('undo upvote button', () => {
    describe('when isUpvotePossible flag is not set', () => {
      const componentWithUndoButton = TestUtils.renderIntoDocument(
        <Vote {...defaultProps} isUpvotePossible={false}/>
      );

      it('is visible', () => {
        expect(() => {
          TestUtils.findRenderedDOMComponentWithClass(componentWithUndoButton, 'undo-upvote-button');
        }).toNotThrow;
      });

      it('runs passed undoUpvote handler when clicked', () => {
        const element = TestUtils
          .findRenderedDOMComponentWithClass(componentWithUndoButton, 'undo-upvote-button');
        TestUtils.Simulate.click(element);
        expect(undoUpvote).toHaveBeenCalled();
      });
    });

    describe('when isUpvotePossible flag is set', () => {
      it('is not visible', () => {
        expect(() => {
          TestUtils.findRenderedDOMComponentWithClass(component, 'undo-upvote-button');
        }).toThrow('Did not find exactly one match (found: 0) for class:undo-upvote-button');
      });
    });
  });
});
