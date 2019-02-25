/**
 * The main script for the site.
 */

(function (cityBacklog, $, undefined) {

  var el = {};

  var val = {};

  cityBacklog.initTabs = function () {
    $('ul.tabs-list').each(function(){
      // For each set of tabs, we want to keep track of
      // which tab is active and its associated content
      var $active, $content, $links = $(this).find('a');

      // If the location.hash matches one of the links, use that as the active tab.
      // If no match is found, use the first link as the initial active tab.
      $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
      $active.parent().addClass('active');

      $content = $($active[0].hash);

      // Hide the remaining content
      $links.not($active).each(function () {
        $(this.hash).hide();
      });

      // Bind the click event handler
      $(this).on('click', 'a', function(e){
        // Make the old tab inactive.
        $active.parent().removeClass('active');
        $content.hide();

        // Update the variables with the new link and content
        $active = $(this);
        $content = $(this.hash);

        // Make the tab active.
        $active.parent().addClass('active');
        $content.show();

        // Prevent the anchor's default click action
        e.preventDefault();
      });
    });
  };

  cityBacklog.showAddMemberPopup = function (event) {
    el.addMember.magnificPopup('open');
  };

  var initHandlers = function () {
    el.actionFilter.on('click', function () {

      $(this).addClass('showing-filters');

      var screenWidth = $(window).width();

      // Find the location of the filter button.
      var position = $(this).position();

      // Find the dimensions of the filter button.
      var height = $(this).outerHeight();

      // The top position of the popup.
      var popupTop = position.top + height;

      // The left position of the popup.
      var popupLeft = position.left;
      if (screenWidth <= 1024) {
        el.filterPopup.css('right', '0px');
      } else if (screenWidth <= 640) {
        popupLeft = parseInt(screenWidth * 0.1, 10);
        el.filterPopup.css('left', popupLeft + 'px');
      } else {
        el.filterPopup.css('left', popupLeft + 'px');
      }

      // Show the filter popup at this position.
      el.filterPopup.css('top', popupTop + 'px');

      el.filterPopup.show();
    });

    el.filterPopup.find('.action-filter').each(function (index, element) {
      $(element).on('click', function () {
        $(this).toggleClass('selected');
      });
    });

    el.focusAreaListCreateTeam.find('.action-filter').each(function (index, element) {
      $(element).on('click', function () {
        $(this).toggleClass('selected');
      });
    });


    el.doneButton.on('click', function () {
      el.actionFilter.removeClass('showing-filters');
      el.filterPopup.hide();
    });

    el.clearButton.on('click', function () {
      clearAllFilters();
    });

    if (el.mapViewButton) {
      el.mapViewButton.on('click', function () {
        window.location.href = 'http://ec2-13-127-219-5.ap-south-1.compute.amazonaws.com/city_backlog/ideas/map_view.html';
      });
    }

    if (el.inviteButton) {
      // Invite team members popup
      
      el.inviteButton.on('click', function () {
        showInviteMembersPopup();
      });
    }

    if (el.inviteDoneButton) {
      el.inviteDoneButton.on('click', function () {
        el.inviteButton.magnificPopup('close');
      });
    }

    if (el.addAchievement) {
      el.addAchievement.on('click', function () {
        showAddAchievementPopup();
      });
    }

    if (el.addFocusArea) {
      el.addFocusArea.on('click', function () {
        el.addFocusArea.magnificPopup('open');
      });
    }

    if (el.addAchievementClose) {
      el.addAchievementClose.on('click', function () {
        el.addAchievement.magnificPopup('close');
      });
    }

    if (el.addMemberClose) {
      el.addMemberClose.on('click', function () {
        el.addMember.magnificPopup('close');
      });
    }

    if (el.addFocusAreaClose) {
      el.addFocusAreaClose.on('click', function () {
        el.addFocusArea.magnificPopup('close');
      });
    }

  };

  var showInviteMembersPopup = function () {
    el.inviteButton.magnificPopup('open');
  };

  var showAddAchievementPopup = function () {
    el.addAchievement.magnificPopup('open');
  };

  var initPopups = function () {
    if (el.inviteButton) {
      el.inviteButton.magnificPopup({
        items: {
          src: '#invite-members-popup',
          type: 'inline'
        },
        modal: true
      });
    }

    if (el.addAchievement) {
      el.addAchievement.magnificPopup({
        items: {
          src: '#add-achievement-popup',
          type: 'inline'
        },
        modal: true
      });
    }

    if (el.addMember) {
      el.addMember.magnificPopup({
        items: {
          src: '#add-member-popup',
          type: 'inline'
        },
        modal: true
      });
    }

    if (el.addFocusArea) {
      el.addFocusArea.magnificPopup({
        items: {
          src: '#add-focus-area-popup',
          type: 'inline'
        },
        modal: true
      });
    }

  };

  var clearAllFilters = function () {
    el.filterPopup.find('.action-filter.selected').removeClass('selected');
  };

  var doLookups = function () {
    el.actionFilter = $('#action-filter');
    el.filterPopup = $('#filters');

    el.doneButton = $('#close_filters');
    el.clearButton = $('#clear_all_filters');

    el.mapViewButton = $('#action-map-view');

    el.inviteButton = $('#invite-members');
    el.inviteDoneButton = $('#invite-popup-close');

    el.addAchievement = $('#add-achievement');
    el.addAchievementClose = $('#add-achievement-done');

    el.addMember = $('#create-team-add-member');
    el.addMemberClose = $('#add-member-done');

    el.addFocusArea = $('#add-focus-area');
    el.addFocusAreaClose = $('#add-focus-area-done');

    el.focusAreaListCreateTeam = $('#add-focus-area-popup');
  };

  cityBacklog.init = function () {
    doLookups();
    initHandlers();
    initPopups();
  };

}(window.cityBacklog = window.cityBacklog || {}, jQuery));

jQuery(function () {
  cityBacklog.init();
});

